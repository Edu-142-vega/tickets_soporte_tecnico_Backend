import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // simulación BD

  create(dto: CreateUserDto) {
    const user: User = {
      id: this.users.length + 1,
      nombre: dto.nombre,
      email: dto.email,
      password: dto.password,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
