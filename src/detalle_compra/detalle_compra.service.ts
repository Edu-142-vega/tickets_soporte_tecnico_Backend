import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Detalle_compra } from './detalle_compra.entity';
import { CreateDetalle_compraDto } from './dto/create-detalle_compra.dto';
import { UpdateDetalle_compraDto } from './dto/update-detalle_compra.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class Detalle_comprasService {
  constructor(
    @InjectRepository(Detalle_compra)
    private readonly detalleCompraRepository: Repository<Detalle_compra>,
  ) {}

  async create(dto: CreateDetalle_compraDto): Promise<Detalle_compra | null> {
    try {
      const detalle = this.detalleCompraRepository.create(dto);
      return await this.detalleCompraRepository.save(detalle);
    } catch (err) {
      console.error('Error creating detalle_compra:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Detalle_compra> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.detalleCompraRepository.createQueryBuilder('detalle');

      // 🔎 SEARCH (ajusta campos si tu entity tiene otros)
      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'cantidad':
              query.where('detalle.cantidad::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            case 'precio':
              query.where('detalle.precio::text ILIKE :search', {
                search: `%${search}%`,
              });
              break;

            default:
              query.where(
                `(detalle.cantidad::text ILIKE :search OR detalle.precio::text ILIKE :search)`,
                { search: `%${search}%` },
              );
          }
        } else {
          query.where(
            `(detalle.cantidad::text ILIKE :search OR detalle.precio::text ILIKE :search)`,
            { search: `%${search}%` },
          );
        }
      }

      // ↕️ SORT
      if (sort) {
        query.orderBy(`detalle.${sort}`, (order ?? 'ASC') as 'ASC' | 'DESC');
      }

      return await paginate<Detalle_compra>(query, { page, limit });
    } catch (err) {
      console.error('Error retrieving detalle_compras:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Detalle_compra | null> {
    try {
      return await this.detalleCompraRepository.findOne({
        where: { id_detalle_compra: id },
      });
    } catch (err) {
      console.error('Error finding detalle_compra:', err);
      return null;
    }
  }

  async update(
    id: string,
    dto: UpdateDetalle_compraDto,
  ): Promise<Detalle_compra | null> {
    try {
      const detalle = await this.findOne(id);
      if (!detalle) return null;

      Object.assign(detalle, dto);
      return await this.detalleCompraRepository.save(detalle);
    } catch (err) {
      console.error('Error updating detalle_compra:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Detalle_compra | null> {
    try {
      const detalle = await this.findOne(id);
      if (!detalle) return null;

      return await this.detalleCompraRepository.remove(detalle);
    } catch (err) {
      console.error('Error deleting detalle_compra:', err);
      return null;
    }
  }
}
