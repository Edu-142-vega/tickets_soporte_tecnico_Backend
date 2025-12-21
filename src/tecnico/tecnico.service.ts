import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Tecnico } from './tecnico.entity';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class TecnicoService {
  constructor(
    @InjectRepository(Tecnico)
    private readonly tecnicoRepository: Repository<Tecnico>,
  ) {}

  async create(dto: CreateTecnicoDto): Promise<Tecnico | null> {
    try {
      const tecnico = this.tecnicoRepository.create(dto);
      return await this.tecnicoRepository.save(tecnico);
    } catch (err) {
      console.error('Error creating tecnico:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Tecnico> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;
      const query = this.tecnicoRepository.createQueryBuilder('tecnico');

      if (search) {
        // ✅ Ajusta estos campos a los reales de tu entity Tecnico
        switch (searchField) {
          case 'nombre':
            query.where('tecnico.nombre ILIKE :search', { search: `%${search}%` });
            break;

          case 'correo':
            query.where('tecnico.correo ILIKE :search', { search: `%${search}%` });
            break;

          default:
            query.where(
              '(tecnico.nombre ILIKE :search OR tecnico.correo ILIKE :search)',
              { search: `%${search}%` },
            );
        }
      }

      if (sort) {
        query.orderBy(`tecnico.${sort}`, (order ?? 'ASC') as 'ASC' | 'DESC');
      }

      return await paginate<Tecnico>(query, { page, limit });
    } catch (err) {
      console.error('Error retrieving tecnicos:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Tecnico | null> {
    try {
      return await this.tecnicoRepository.findOne({ where: { id_tecnico: id } });
    } catch (err) {
      console.error('Error finding tecnico:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateTecnicoDto): Promise<Tecnico | null> {
    try {
      const tecnico = await this.findOne(id);
      if (!tecnico) return null;

      Object.assign(tecnico, dto);
      return await this.tecnicoRepository.save(tecnico);
    } catch (err) {
      console.error('Error updating tecnico:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Tecnico | null> {
    try {
      const tecnico = await this.findOne(id);
      if (!tecnico) return null;

      return await this.tecnicoRepository.remove(tecnico);
    } catch (err) {
      console.error('Error deleting tecnico:', err);
      return null;
    }
  }
}
