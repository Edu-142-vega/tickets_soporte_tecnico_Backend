import {Injectable,InternalServerErrorException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {paginate,IPaginationOptions,Pagination,} from 'nestjs-typeorm-paginate';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.repository.create({
        nombre: dto.nombre,
        email: dto.email,
        password: dto.password,
        createdAt: new Date(),
      });

      return await this.repository.save(user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new InternalServerErrorException(
        'No se pudo crear el usuario',
      );
    }
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    try {
      const queryBuilder = this.repository
        .createQueryBuilder('user')
        .orderBy('user.createdAt', 'DESC');

      return await paginate<User>(queryBuilder, options);
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw new InternalServerErrorException(
        'No se pudieron obtener los usuarios',
      );
    }
  }

  
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }
}
