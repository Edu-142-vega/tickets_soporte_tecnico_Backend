import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);

      if (!user) {
        throw new InternalServerErrorException(
          'No se pudo registrar el usuario',
        );
      }

      return {
        message: 'Usuario registrado correctamente',
        user,
      };
    } catch (err) {
      console.error('Error registering user:', err);

      if (err.code === '23505') {
        throw new ConflictException('El correo ya está registrado');
      }

      throw err;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);

      if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      if (user.password !== dto.password) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      return {
        message: 'Login correcto',
        user,
      };
    } catch (err) {
      console.error('Error logging in:', err);
      throw err;
    }
  }
}
