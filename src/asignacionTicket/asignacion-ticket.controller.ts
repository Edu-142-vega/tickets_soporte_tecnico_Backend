import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AsignacionTicketService } from './asignacion-ticket.service';
import { CreateAsignacionTicketDto } from './dto/create-asignacionTicket.dto';
import { UpdateAsignacionTicketDto } from './dto/update-asignacionTicket.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AsignacionTicket } from './asignacionTicket.entity';

@Controller('asignacionTicket')
export class AsignacionTicketController {
  constructor(private readonly asignacionTicketService: AsignacionTicketService) {}

  @Post()
  create(@Body() createDto: CreateAsignacionTicketDto) {
    return this.asignacionTicketService.create(createDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<AsignacionTicket>> {
    limit = limit > 100 ? 100 : limit;
    return this.asignacionTicketService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionTicketService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateAsignacionTicketDto) {
    return this.asignacionTicketService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionTicketService.remove(id);
  }
}
