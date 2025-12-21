import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query,
  NotFoundException, InternalServerErrorException,
  UseGuards
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { Ticket } from './ticket.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateTicketDto) {
    const ticket = await this.ticketsService.create(dto);
    if (!ticket) throw new InternalServerErrorException('Failed to create ticket');
    return new SuccessResponseDto('Ticket created successfully', ticket);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<Ticket>>> {
    if (query.limit && query.limit > 100) query.limit = 100;

    const result = await this.ticketsService.findAll(query);

    if (!result) throw new InternalServerErrorException('Could not retrieve tickets');

    return new SuccessResponseDto('Tickets retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(id);
    if (!ticket) throw new NotFoundException('Ticket not found');
    return new SuccessResponseDto('Ticket retrieved successfully', ticket);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTicketDto) {
    const ticket = await this.ticketsService.update(id, dto);
    if (!ticket) throw new NotFoundException('Ticket not found');
    return new SuccessResponseDto('Ticket updated successfully', ticket);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ticket = await this.ticketsService.remove(id);
    if (!ticket) throw new NotFoundException('Ticket not found');
    return new SuccessResponseDto('Ticket deleted successfully', ticket);
  }
}
