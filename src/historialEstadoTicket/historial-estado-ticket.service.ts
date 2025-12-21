import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { HistorialEstadoTicket } from './historialEstadoTicket.entity';
import { CreateHistorialEstadoTicketDto } from './dto/create-historialEstadoTicket.dto';
import { UpdateHistorialEstadoTicketDto } from './dto/update-historialEstadoTicket.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class HistorialEstadoTicketService {
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: UpdateHistorialEstadoTicketDto) {
    throw new Error('Method not implemented.');
  }
  findOne(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(HistorialEstadoTicket)
    private readonly historialRepository: Repository<HistorialEstadoTicket>,
  ) {}

  async create(dto: CreateHistorialEstadoTicketDto): Promise<HistorialEstadoTicket | null> {
    try {
      const historial = this.historialRepository.create(dto);
      return await this.historialRepository.save(historial);
    } catch (err) {
      console.error('Error creating historialEstadoTicket:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<HistorialEstadoTicket> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.historialRepository.createQueryBuilder('historial');

      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'id_ticket':
              query.where('historial.id_ticket::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'estado_anterior':
              query.where('historial.estado_anterior ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'estado_nuevo':
              query.where('historial.estado_nuevo ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'fecha_cambio':
              query.where('historial.fecha_cambio::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'comentario':
              query.where('historial.comentario ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            default:
              query.where(
                `(historial.id_ticket::text ILIKE :search OR historial.estado_anterior ILIKE :search OR historial.estado_nuevo IL_
