import {
  Controller, Get, Post, Param, Body, Query, InternalServerErrorException
} from '@nestjs/common';
import { MensajesTicketService } from './mensajes-ticket.service';
import { CreateMensajeTicketDto } from './dto/create-mensaje-ticket.dto';

@Controller('mensajes-ticket')
export class MensajesTicketController {
  constructor(private readonly mensajesService: MensajesTicketService) {}

  @Post()
  async create(@Body() dto: CreateMensajeTicketDto) {
    const mensaje = await this.mensajesService.create(dto);
    if (!mensaje) throw new InternalServerErrorException('Failed to create mensaje');
    return {
      message: 'Mensaje created successfully',
      data: mensaje,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const result = await this.mensajesService.findAll({ page, limit });
    if (!result) throw new InternalServerErrorException('Could not retrieve mensajes');
    return {
      message: 'Mensajes retrieved successfully',
      data: result,
    };
  }

  @Get('ticket/:id_ticket')
  async findByTicket(
    @Param('id_ticket') id_ticket: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const result = await this.mensajesService.findByTicket(
      Number(id_ticket),
      { page, limit },
    );
    if (!result) throw new InternalServerErrorException('Could not retrieve mensajes by ticket');
    return {
      message: 'Mensajes by ticket retrieved successfully',
      data: result,
    };
  }
}
