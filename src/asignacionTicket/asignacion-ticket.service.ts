import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

import { AsignacionTicket } from './asignacionTicket.entity';
import { CreateAsignacionTicketDto } from './dto/create-asignacionTicket.dto';
import { UpdateAsignacionTicketDto } from './dto/update-asignacionTicket.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class AsignacionTicketService {
  constructor(
    @InjectRepository(AsignacionTicket)
    private readonly asignacionRepository: Repository<AsignacionTicket>,
  ) {}

  async create(dto: CreateAsignacionTicketDto): Promise<AsignacionTicket | null> {
    try {
      const asignacion = this.asignacionRepository.create(dto);
      return await this.asignacionRepository.save(asignacion);
    } catch (err) {
      console.error('Error creating asignacionTicket:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<AsignacionTicket> | null> {
    try {
      const { search, searchField, sort, order } = queryDto;

      const page = queryDto.page ?? 1;
      const limit = queryDto.limit ?? 10;

      const query = this.asignacionRepository.createQueryBuilder('asignacion');

      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'id_ticket':
              query.where('asignacion.id_ticket::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'id_tecnico':
              query.where('asignacion.id_tecnico::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'fecha_asignacion':
              query.where('asignacion.fecha_asignacion::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            default:
              query.where(
                `(asignacion.id_ticket::text ILIKE :search OR asignacion.id_tecnico::text ILIKE :search OR asignacion.fecha_asignacion::text ILIKE :search)`,
                { search: `%${search}%` },
              );
          }
        } else {
          query.where(
            `(asignacion.id_ticket::text ILIKE :search OR asignacion.id_tecnico::text ILIKE :search OR asignacion.fecha_asignacion::text ILIKE :search)`,
            { search: `%${search}%` },
          );
        }
      }

      if (sort) {
        query.orderBy(`asignacion.${sort}`, (order ?? 'ASC') as 'ASC' | 'DESC');
      }

      query.skip((page - 1) * limit).take(limit);

      const [items, totalItems] = await query.getManyAndCount();

      const totalPages = Math.ceil(totalItems / limit) || 1;

      return {
        items,
        meta: {
          itemCount: items.length,
          totalItems,
          itemsPerPage: limit,
          totalPages,
          currentPage: page,
        },
        links: {
          first: `?page=1&limit=${limit}`,
          previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : '',
          next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : '',
          last: `?page=${totalPages}&limit=${limit}`,
        },
      };
    } catch (err) {
      console.error('Error retrieving asignacionTicket:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<AsignacionTicket | null> {
    try {
      return await this.asignacionRepository.findOne({
        where: { id_asignacion: id },
      });
    } catch (err) {
      console.error('Error finding asignacionTicket:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateAsignacionTicketDto): Promise<AsignacionTicket | null> {
    try {
      const asignacion = await this.findOne(id);
      if (!asignacion) return null;

      Object.assign(asignacion, dto);
      return await this.asignacionRepository.save(asignacion);
    } catch (err) {
      console.error('Error updating asignacionTicket:', err);
      return null;
    }
  }

  async remove(id: string): Promise<AsignacionTicket | null> {
    try {
      const asignacion = await this.findOne(id);
      if (!asignacion) return null;

      return await this.asignacionRepository.remove(asignacion);
    } catch (err) {
      console.error('Error deleting asignacionTicket:', err);
      return null;
    }
  }
}
