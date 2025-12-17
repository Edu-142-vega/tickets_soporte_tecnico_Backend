import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HistorialEstadoTicketService } from './historial-estado-ticket.service';
import { CreateHistorialEstadoTicketDto } from './dto/create-historialEstadoTicket.dto';
import { UpdateHistorialEstadoTicketDto } from './dto/update-historialEstadoTicket.dto';

@Controller('historialEstadoTicket')
export class HistorialEstadoTicketController {
  constructor(private readonly historialEstadoTicketService: HistorialEstadoTicketService) {}

  @Post()
  create(@Body() createDto: CreateHistorialEstadoTicketDto) {
    return this.historialEstadoTicketService.create(createDto);
  }

  @Get()
  findAll() {
    return this.historialEstadoTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialEstadoTicketService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateHistorialEstadoTicketDto) {
    return this.historialEstadoTicketService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialEstadoTicketService.remove(id);
  }
}
