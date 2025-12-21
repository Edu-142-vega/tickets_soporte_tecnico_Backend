import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Compra } from './compra.entity';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  async create(dto: CreateCompraDto): Promise<Compra | null> {
    try {
      const compra = this.compraRepository.create(dto);
      return await this.compraRepository.save(compra);
    } catch (err) {
      console.error('Error creating compra:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Compra> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.compraRepository.createQueryBuilder('compra');

      // 🔎 Search (opcional)
      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'id_cliente':
              query.where('compra.id_cliente ILIKE :search', { search: `%${search}%` });
              break;
            case 'fecha_compra':
              query.where('compra.fecha_compra ILIKE :search', { search: `%${search}%` });
              break;
            case 'metodo_pago':
              query.where('compra.metodo_pago ILIKE :search', { search: `%${search}%` });
              break;
            case 'total':
              query.where('compra.total ILIKE :search', { search: `%${search}%` });
              break;
            case 'estado':
              query.where('compra.estado ILIKE :search', { search: `%${search}%` });
              break;
            default:
              query.where(
                `(compra.id_cliente ILIKE :search
                  OR compra.fecha_compra ILIKE :search
                  OR compra.metodo_pago ILIKE :search
                  OR compra.total ILIKE :search
                  OR compra.estado ILIKE :search)`,
                { search: `%${search}%` },
              );
          }
        } else {
          query.where(
            `(compra.id_cliente ILIKE :search
              OR compra.fecha_compra ILIKE :search
              OR compra.metodo_pago ILIKE :search
              OR compra.total ILIKE :search
              OR compra.estado ILIKE :search)`,
            { search: `%${search}%` },
          );
        }
      }

      // ↕️ Sort (opcional)
      if (sort) {
        query.orderBy(`compra.${sort}`, (order ?? 'ASC') as 'ASC' | 'DESC');
      }

      return await paginate<Compra>(query, { page, limit });
    } catch (err) {
      console.error('Error retrieving compras:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Compra | null> {
    try {
      return await this.compraRepository.findOne({ where: { id_compra: id } });
    } catch (err) {
      console.error('Error finding compra:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateCompraDto): Promise<Compra | null> {
    try {
      const compra = await this.findOne(id);
      if (!compra) return null;

      Object.assign(compra, dto);
      return await this.compraRepository.save(compra);
    } catch (err) {
      console.error('Error updating compra:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Compra | null> {
    try {
      const compra = await this.findOne(id);
      if (!compra) return null;

      return await this.compraRepository.remove(compra);
    } catch (err) {
      console.error('Error deleting compra:', err);
      return null;
    }
  }
}
