import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { HistorialEstadoTicketService } from './historial-estado-ticket.service';
import { CreateHistorialEstadoTicketDto } from './dto/create-historialEstadoTicket.dto';
import { UpdateHistorialEstadoTicketDto } from './dto/update-historialEstadoTicket.dto';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { HistorialEstadoTicket } from './historialEstadoTicket.entity';

@Controller('historialEstadoTicket')
export class HistorialEstadoTicketController {
  constructor(private readonly historialEstadoTicketService: HistorialEstadoTicketService) {}

  @Post()
  create(@Body() createDto: CreateHistorialEstadoTicketDto) {
    return this.historialEstadoTicketService.create(createDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<HistorialEstadoTicket>> {
    limit = limit > 100 ? 100 : limit;
    return this.historialEstadoTicketService.findAll({ page, limit });
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
