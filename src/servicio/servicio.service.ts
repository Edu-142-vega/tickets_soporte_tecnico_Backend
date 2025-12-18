import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  create(createServicioDto: CreateServicioDto) {
    const servicio = this.servicioRepository.create(createServicioDto);
    return this.servicioRepository.save(servicio);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Servicio>> {
    const queryBuilder = this.servicioRepository.createQueryBuilder('servicio');
    return paginate<Servicio>(queryBuilder, options);
  }

  findOne(id: string) {
    return this.servicioRepository.findOne({
      where: { id_servicio: id },
    });
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.servicioRepository.findOne({
      where: { id_servicio: id },
    });

    if (!servicio) return null;

    Object.assign(servicio, updateServicioDto);
    return this.servicioRepository.save(servicio);
  }

  async remove(id: string) {
    const servicio = await this.servicioRepository.findOne({
      where: { id_servicio: id },
    });

    if (!servicio) return null;

    return this.servicioRepository.remove(servicio);
  }
}
