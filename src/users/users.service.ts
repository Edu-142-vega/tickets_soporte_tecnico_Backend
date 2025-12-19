import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { paginate,IPaginationOptions, Pagination,} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repository.create({
      nombre: dto.nombre,
      email: dto.email,
      password: dto.password,
      createdAt: new Date(),
    });

    return this.repository.save(user);
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    queryBuilder.orderBy('user.createdAt', 'DESC');

    return paginate<User>(queryBuilder, options);
  }
}
