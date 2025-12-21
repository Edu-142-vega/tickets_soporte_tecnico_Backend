import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Servicio } from './servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async create(dto: CreateServicioDto): Promise<Servicio | null> {
    try {
      const servicio = this.servicioRepository.create(dto);
      return await this.servicioRepository.save(servicio);
    } catch (err) {
      console.error('Error creating servicio:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Servicio> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;
      const query = this.servicioRepository.createQueryBuilder('servicio');


      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'nombre':
              query.where('servicio.nombre ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'descripcion':
              query.where('servicio.descripcion ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'tipo':
              query.where('servicio.tipo ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'estado':
              query.where('servicio.estado ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            default:
              query.where(
                `(servicio.nombre ILIKE :search
                  OR servicio.descripcion ILIKE :search
                  OR servicio.tipo ILIKE :search
                  OR servicio.estado ILIKE :search)`,
                { search: `%${search}%` },
              );
          }
        } else {
          query.where(
            `(servicio.nombre ILIKE :search
              OR servicio.descripcion ILIKE :search
              OR servicio.tipo ILIKE :search
              OR servicio.estado ILIKE :search)`,
            { search: `%${search}%` },
          );
        }
      }

      // ↕️ ORDENAMIENTO
      if (sort) {
        query.orderBy(`servicio.${sort}`, (order ?? 'ASC') as 'ASC' | 'DESC');
      }

      return await paginate<Servicio>(query, { page, limit });
    } catch (err) {
      console.error('Error retrieving servicios:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Servicio | null> {
    try {
      return await this.servicioRepository.findOne({
        where: { id_servicio: id },
      });
    } catch (err) {
      console.error('Error finding servicio:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateServicioDto): Promise<Servicio | null> {
    try {
      const servicio = await this.findOne(id);
      if (!servicio) return null;

      Object.assign(servicio, dto);
      return await this.servicioRepository.save(servicio);
    } catch (err) {
      console.error('Error updating servicio:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Servicio | null> {
    try {
      const servicio = await this.findOne(id);
      if (!servicio) return null;

      return await this.servicioRepository.remove(servicio);
    } catch (err) {
      console.error('Error deleting servicio:', err);
      return null;
    }
  }
}
