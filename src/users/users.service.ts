import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // 🔍 Buscar por email (login)
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  // ➕ Crear usuario
  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.repository.create(dto);
      return await this.repository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo crear el usuario',
      );
    }
  }

  // 📄 Listar usuarios (GET /users)
  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    const queryBuilder =
      this.repository.createQueryBuilder('user');

    return paginate<User>(queryBuilder, options);
  }

  // ✏️ Actualizar usuario (PUT /users/:id)
  async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con id ${id} no encontrado`,
      );
    }

    Object.assign(user, dto);
    return this.repository.save(user);
  }

  // 🗑️ Eliminar usuario (DELETE /users/:id)
  async remove(id: number) {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con id ${id} no encontrado`,
      );
    }

    await this.repository.remove(user);

    return {
      message: 'Usuario eliminado correctamente',
    };
  }
}
