import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query,
  NotFoundException, InternalServerErrorException
} from '@nestjs/common';

import { HistorialEstadoTicketService } from './historial-estado-ticket.service';
import { CreateHistorialEstadoTicketDto } from './dto/create-historialEstadoTicket.dto';
import { UpdateHistorialEstadoTicketDto } from './dto/update-historialEstadoTicket.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { HistorialEstadoTicket } from './historialEstadoTicket.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('historialEstadoTicket')
export class HistorialEstadoTicketController {
  constructor(private readonly historialEstadoTicketService: HistorialEstadoTicketService) {}

  @Post()
  async create(@Body() dto: CreateHistorialEstadoTicketDto) {
    const historial = await this.historialEstadoTicketService.create(dto);
    if (!historial) throw new InternalServerErrorException('Failed to create historialEstadoTicket');
    return new SuccessResponseDto('HistorialEstadoTicket created successfully', historial);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<HistorialEstadoTicket>>> {
    if (query.limit && query.limit > 100) query.limit = 100;

    const result = await this.historialEstadoTicketService.findAll(query);

    if (!result) throw new InternalServerErrorException('Could not retrieve historialEstadoTicket');

    return new SuccessResponseDto('HistorialEstadoTicket retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const historial = await this.historialEstadoTicketService.findOne(id);
    if (!historial) throw new NotFoundException('HistorialEstadoTicket not found');
    return new SuccessResponseDto('HistorialEstadoTicket retrieved successfully', historial);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateHistorialEstadoTicketDto) {
    const historial = await this.historialEstadoTicketService.update(id, dto);
    if (!historial) throw new NotFoundException('HistorialEstadoTicket not found');
    return new SuccessResponseDto('HistorialEstadoTicket updated successfully', historial);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const historial = await this.historialEstadoTicketService.remove(id);
    if (!historial) throw new NotFoundException('HistorialEstadoTicket not found');
    return new SuccessResponseDto('HistorialEstadoTicket deleted successfully', historial);
  }
}
