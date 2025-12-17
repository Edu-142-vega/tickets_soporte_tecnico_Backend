import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AsignacionTicketService } from './asignacion-ticket.service';
import { CreateAsignacionTicketDto } from './dto/create-asignacionTicket.dto';
import { UpdateAsignacionTicketDto } from './dto/update-asignacionTicket.dto';

@Controller('asignacionTicket')
export class AsignacionTicketController {
  constructor(private readonly asignacionTicketService: AsignacionTicketService) {}

  @Post()
  create(@Body() createDto: CreateAsignacionTicketDto) {
    return this.asignacionTicketService.create(createDto);
  }

  @Get()
  findAll() {
    return this.asignacionTicketService.findAll();
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
