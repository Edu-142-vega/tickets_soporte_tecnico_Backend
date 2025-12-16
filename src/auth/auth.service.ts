import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    register(dto: RegisterDto) {
        throw new Error('Method not implemented.');
    }
    login(dto: LoginDto) {
        throw new Error('Method not implemented.');
    }
}
