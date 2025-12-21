import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query,
  NotFoundException, InternalServerErrorException,
  UseGuards
} from '@nestjs/common';

import { AsignacionTicketService } from './asignacion-ticket.service';
import { CreateAsignacionTicketDto } from './dto/create-asignacionTicket.dto';
import { UpdateAsignacionTicketDto } from './dto/update-asignacionTicket.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { AsignacionTicket } from './asignacionTicket.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('asignacionTicket')
export class AsignacionTicketController {
  constructor(private readonly asignacionTicketService: AsignacionTicketService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateAsignacionTicketDto) {
    const asignacion = await this.asignacionTicketService.create(dto);
    if (!asignacion) throw new InternalServerErrorException('Failed to create asignacionTicket');
    return new SuccessResponseDto('AsignacionTicket created successfully', asignacion);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<AsignacionTicket>>> {
    if (query.limit && query.limit > 100) query.limit = 100;

    const result = await this.asignacionTicketService.findAll(query);

    if (!result) throw new InternalServerErrorException('Could not retrieve asignacionTicket');

    return new SuccessResponseDto('AsignacionTicket retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const asignacion = await this.asignacionTicketService.findOne(id);
    if (!asignacion) throw new NotFoundException('AsignacionTicket not found');
    return new SuccessResponseDto('AsignacionTicket retrieved successfully', asignacion);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAsignacionTicketDto) {
    const asignacion = await this.asignacionTicketService.update(id, dto);
    if (!asignacion) throw new NotFoundException('AsignacionTicket not found');
    return new SuccessResponseDto('AsignacionTicket updated successfully', asignacion);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const asignacion = await this.asignacionTicketService.remove(id);
    if (!asignacion) throw new NotFoundException('AsignacionTicket not found');
    return new SuccessResponseDto('AsignacionTicket deleted successfully', asignacion);
  }
}
