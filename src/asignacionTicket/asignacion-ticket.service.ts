import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionTicket } from './asignacionTicket.entity';
import { CreateAsignacionTicketDto } from './dto/create-asignacionTicket.dto';
import { UpdateAsignacionTicketDto } from './dto/update-asignacionTicket.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';


@Injectable()
export class AsignacionTicketService {
  constructor(
    @InjectRepository(AsignacionTicket)
    private readonly asignacionRepository: Repository<AsignacionTicket>,
  ) {}

  create(createDto: CreateAsignacionTicketDto) {
    const asignacion = this.asignacionRepository.create(createDto);
    return this.asignacionRepository.save(asignacion);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<AsignacionTicket>> {
    const queryBuilder = this.asignacionRepository.createQueryBuilder('asignacion');
    return paginate<AsignacionTicket>(queryBuilder, options);
  }


  findOne(id: string) {
    return this.asignacionRepository.findOne({ where: { id_asignacion: id } });
  }

  async update(id: string, updateDto: UpdateAsignacionTicketDto) {
    const asignacion = await this.asignacionRepository.findOne({ where: { id_asignacion: id } });
    if (!asignacion) return null;
    Object.assign(asignacion, updateDto);
    return this.asignacionRepository.save(asignacion);
  }

  async remove(id: string) {
    const asignacion = await this.asignacionRepository.findOne({ where: { id_asignacion: id } });
    if (!asignacion) return null;
    return this.asignacionRepository.remove(asignacion);
  }
}
