import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    const payload = {
      id: user.id,
      email: user.email,
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: 'USER' 
      }
    }
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    })

    const payload = {
      id: user.id,
      email: user.email,
    }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: 'USER'
      }
    }
  }
}