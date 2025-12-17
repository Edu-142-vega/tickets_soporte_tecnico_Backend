import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialEstadoTicket } from './historialEstadoTicket.entity';
import { CreateHistorialEstadoTicketDto } from './dto/create-historialEstadoTicket.dto';
import { UpdateHistorialEstadoTicketDto } from './dto/update-historialEstadoTicket.dto';

@Injectable()
export class HistorialEstadoTicketService {
  constructor(
    @InjectRepository(HistorialEstadoTicket)
    private readonly historialRepository: Repository<HistorialEstadoTicket>,
  ) {}

  create(createDto: CreateHistorialEstadoTicketDto) {
    const historial = this.historialRepository.create(createDto);
    return this.historialRepository.save(historial);
  }

  findAll() {
    return this.historialRepository.find();
  }

  findOne(id: string) {
    return this.historialRepository.findOne({ where: { id_historial: id } });
  }

  async update(id: string, updateDto: UpdateHistorialEstadoTicketDto) {
    const historial = await this.historialRepository.findOne({ where: { id_historial: id } });
    if (!historial) return null;
    Object.assign(historial, updateDto);
    return this.historialRepository.save(historial);
  }

  async remove(id: string) {
    const historial = await this.historialRepository.findOne({ where: { id_historial: id } });
    if (!historial) return null;
    return this.historialRepository.remove(historial);
  }
}
