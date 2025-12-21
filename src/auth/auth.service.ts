import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);

      return {
        message: 'Usuario registrado correctamente',
        user,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El correo ya existe');
      }
      throw new InternalServerErrorException(
        'Error al registrar',
      );
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    return {
      message: 'Login correcto',
      user,
    };
  }
}
