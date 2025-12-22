import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('gmail')
  async sendGmail(@Body() dto: SendMailDto) {
    const result = await this.mailService.sendMail(dto);
    return new SuccessResponseDto('Correo enviado con Gmail', result);
  }
}
