import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionTicket } from './asignacionTicket.entity';
import { CreateAsignacionTicketDto } from './dto/create-asignacionTicket.dto';
import { UpdateAsignacionTicketDto } from './dto/update-asignacionTicket.dto';

@Injectable()
export class AsignacionTicketService {
  constructor(
    @InjectRepository(AsignacionTicket)
    private readonly asignacionRepository: Repository<AsignacionTicket>,
  ) {}

  create(createDto: CreateAsignacionTicketDto) {
    const asignacion = this.asignacionRepository.create(createDto);
    return this.asignacionRepository.save(asignacion);
  }

  findAll() {
    return this.asignacionRepository.find();
  }

  findOne(id: string) {
    return this.asignacionRepository.findOne({ where: { id_asignacion: id } });
  }

  async update(id: string, updateDto: UpdateAsignacionTicketDto) {
    const asignacion = await this.asignacionRepository.findOne({ where: { id_asignacion: id } });
    if (!asignacion) return null;
    Object.assign(asignacion, updateDto);
    return this.asignacionRepository.save(asignacion);
  }

  async remove(id: string) {
    const asignacion = await this.asignacionRepository.findOne({ where: { id_asignacion: id } });
    if (!asignacion) return null;
    return this.asignacionRepository.remove(asignacion);
  }
}
