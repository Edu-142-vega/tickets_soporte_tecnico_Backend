import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.ticketRepository.createQueryBuilder('ticket');
      
      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'titulo':
              query.where('ticket.titulo ILIKE :search', { search: `%${search}%` });
              break;

            case 'descripcion':
              query.where('ticket.descripcion ILIKE :search', { search: `%${search}%` });
              break;

            case 'estado':
              query.where('ticket.estado ILIKE :search', { search: `%${search}%` });
              break;

            case 'prioridad':
              query.where('ticket.prioridad ILIKE :search', { search: `%${search}%` });
              break;

            default:
              query.where(
                `(ticket.titulo ILIKE :search OR ticket.descripcion ILIKE :search OR ticket.estado ILIKE :search OR ticket.prioridad ILIKE :search)`,
                { search: `%${search}%` },
              );
          }
        } else {
          query.where(
            `(ticket.titulo ILIKE :search OR ticket.descripcion ILIKE :search OR ticket.estado ILIKE :search OR ticket.prioridad ILIKE :search)`,
            { search: `%${search}%` },
          );
        }
      }

      if (sort) {
        query.orderBy(`ticket.${sort}`, (order ?? 'ASC') as 'ASC' | 'DESC');
      }

      return await paginate<Ticket>(query, { page, limit });
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
