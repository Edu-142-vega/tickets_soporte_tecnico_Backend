import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
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

  async create(dto: CreateCompraDto) {
    const compra = this.compraRepository.create(dto);
    return await this.compraRepository.save(compra);
  }

  async findAll(query: QueryDto) {
    const { page, limit, search, searchField, sort, order } = query;


    const allowedSearchFields: (keyof Compra)[] = [
      'id_cliente',
      'fecha_compra',
      'metodo_pago',
      'total',
      'estado',
    ];


    const allowedSortFields: (keyof Compra)[] = [
      'fecha_compra',
      'total',
      'estado',
      'metodo_pago',
      'id_cliente',
    ];

    const where: any = {};
    if (search) {
      if (!searchField) {
        throw new BadRequestException('Debes enviar searchField cuando uses search');
      }
      if (!allowedSearchFields.includes(searchField as keyof Compra)) {
        throw new BadRequestException(`searchField no permitido: ${searchField}`);
      }
      where[searchField] = ILike(`%${search}%`);
    }

    const sortField = sort && allowedSortFields.includes(sort as keyof Compra) ? sort : undefined;
    const sortOrder = order || 'ASC';

    const [items, totalItems] = await this.compraRepository.findAndCount({
      where,
      order: sortField ? { [sortField]: sortOrder } : undefined,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
    };
  }

  async findOne(id: string) {
    const compra = await this.compraRepository.findOne({ where: { id_compra: id } });
    if (!compra) throw new NotFoundException('Compra no encontrada');
    return compra;
  }

  async update(id: string, dto: UpdateCompraDto) {
    const compra = await this.findOne(id);
    Object.assign(compra, dto);
    return await this.compraRepository.save(compra);
  }

  async remove(id: string) {
    const compra = await this.findOne(id);
    await this.compraRepository.remove(compra);
    return { deleted: true };
  }
}
