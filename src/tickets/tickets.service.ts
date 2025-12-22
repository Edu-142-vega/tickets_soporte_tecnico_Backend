import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket | null> {
    try {
      const ticket = this.ticketRepository.create(dto);
      return await this.ticketRepository.save(ticket);
    } catch (err) {
      console.error('Error creating ticket:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Ticket> | null> {
    try {
      const page = queryDto.page ?? 1;
      const limit = queryDto.limit ?? 10;
      const { search, searchField, sort, order } = queryDto;
      let where: any = {};

      if (search) {
        if (searchField) {
          where[searchField] = ILike(`%${search}%`);
        } else {
          where = [
            { titulo: ILike(`%${search}%`) },
            { descripcion: ILike(`%${search}%`) },
            { estado: ILike(`%${search}%`) },
            { prioridad: ILike(`%${search}%`) },
          ];
        }
      }

      return await paginate<Ticket>(
        this.ticketRepository,
        { page, limit },
        {
          where,
          order: sort
            ? { [sort]: (order ?? 'ASC').toUpperCase() as 'ASC' | 'DESC' }
            : undefined,
        },
      );
    } catch (err) {
      console.error('Error retrieving tickets:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Ticket | null> {
    try {
      return await this.ticketRepository.findOne({ where: { id } });
    } catch (err) {
      console.error('Error finding ticket:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket | null> {
    try {
      const ticket = await this.findOne(id);
      if (!ticket) return null;

      Object.assign(ticket, dto);
      return await this.ticketRepository.save(ticket);
    } catch (err) {
      console.error('Error updating ticket:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Ticket | null> {
    try {
      const ticket = await this.findOne(id);
      if (!ticket) return null;

      return await this.ticketRepository.remove(ticket);
    } catch (err) {
      console.error('Error deleting ticket:', err);
      return null;
    }
  }
}
