import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';


@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketRepository.create(createTicketDto);
    return this.ticketRepository.save(ticket);
  }

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: string) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) return null;

    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async remove(id: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) return null;
    return this.ticketRepository.remove(ticket);
  }
}
