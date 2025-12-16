import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  register(dto: CreateUserDto) {
    return {
      message: 'Usuario registrado correctamente',
      user: dto,
    };
  }

  login(dto: any) {
    return {
      message: 'Login correcto',
      user: dto,
    };
  }
}
