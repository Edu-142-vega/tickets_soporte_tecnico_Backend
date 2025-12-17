import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detalle_compra } from './detalle_compra.entity';
import { CreateDetalle_compraDto } from './dto/create-detalle_compra.dto';
import { UpdateDetalle_compraDto } from './dto/update-detalle_compra.dto';

@Injectable()
export class Detalle_comprasService {
  constructor(
    @InjectRepository(Detalle_compra)
    private readonly detalle_compraRepository: Repository<Detalle_compra>,
  ) {}

  create(createDetalle_compraDto: CreateDetalle_compraDto) {
    const detalle_compra = this.detalle_compraRepository.create(createDetalle_compraDto);
    return this.detalle_compraRepository.save(detalle_compra);
  }

  findAll() {
    return this.detalle_compraRepository.find();
  }

  findOne(id: string) {
    return this.detalle_compraRepository.findOne({where: { id_detalle_compra: id }
 });
  }

  async update(id: string, updateDetalle_compraDto: UpdateDetalle_compraDto) {
    const detalle_compra = await this.detalle_compraRepository.findOne({ where: { id_detalle_compra: id }
 });
    if (!detalle_compra) return null;
    Object.assign(detalle_compra, updateDetalle_compraDto);
    return this.detalle_compraRepository.save(detalle_compra);
  }

  async remove(id: string) {
    const detalle_compra = await this.detalle_compraRepository.findOne({ where: { id_detalle_compra: id }
 });
    if (!detalle_compra) return null;
    return this.detalle_compraRepository.remove(detalle_compra);
  }
}
