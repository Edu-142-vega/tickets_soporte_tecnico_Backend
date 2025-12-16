import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from './tecnico.entity';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

@Injectable()
export class TecnicoService {
  constructor(
    @InjectRepository(Tecnico)
    private readonly tecnicoRepository: Repository<Tecnico>,
  ) {}

  create(createTecnicoDto: CreateTecnicoDto) {
  return this.tecnicoRepository.save(
    this.tecnicoRepository.create({ ...createTecnicoDto }),
  );
}

  findAll() {
    return this.tecnicoRepository.find();
  }

  findOne(id: string) {
    return this.tecnicoRepository.findOne({ where: { id_tecnico: id } });
  }

  async update(id: string, updateTecnicoDto: UpdateTecnicoDto) {
    const tecnico = await this.tecnicoRepository.findOne({ where: { id_tecnico: id } });
    if (!tecnico) return null;
    Object.assign(tecnico, updateTecnicoDto);
    return this.tecnicoRepository.save(tecnico);
  }
  
  async remove(id: string) {
    const tecnico = await this.tecnicoRepository.findOne({ where: { id_tecnico: id } });
    if (!tecnico) return null;
    return this.tecnicoRepository.remove(tecnico);
  }
}
