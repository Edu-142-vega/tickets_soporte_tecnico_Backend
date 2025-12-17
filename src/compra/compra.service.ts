import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './compra.entity';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  create(createCompraDto: CreateCompraDto) {
    const compra = this.compraRepository.create(createCompraDto);
    return this.compraRepository.save(compra);
  }

  findAll() {
    return this.compraRepository.find();
  }

  findOne(id: string) {
    return this.compraRepository.findOne({ where: { id_compra: id } });
  }

  async update(id: string, updateCompraDto: UpdateCompraDto) {
    const compra = await this.compraRepository.findOne({ where: { id_compra: id } });
    if (!compra) return null;
    Object.assign(compra, updateCompraDto);
    return this.compraRepository.save(compra);
  }

  async remove(id: string) {
    const compra = await this.compraRepository.findOne({ where: { id_compra: id } });
    if (!compra) return null;
    return this.compraRepository.remove(compra);
  }
}
