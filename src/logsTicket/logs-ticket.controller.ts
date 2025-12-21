import {
  Controller, Get, Post, Put, Delete, Param, Body, Query,
  NotFoundException, InternalServerErrorException
} from '@nestjs/common';

import { LogsTicketService } from './logs-ticket.service';
import { CreateLogTicketDto } from './dto/create-log-ticket.dto';
import { UpdateLogTicketDto } from './dto/update-log-ticket.dto';

@Controller('logs-ticket')
export class LogsTicketController {
  constructor(private readonly logsService: LogsTicketService) {}

  @Post()
  async create(@Body() dto: CreateLogTicketDto) {
    const log = await this.logsService.create(dto);
    if (!log) throw new InternalServerErrorException('Failed to create log');
    return { message: 'Log created successfully', data: log };
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const result = await this.logsService.findAll({ page, limit });
    if (!result) throw new InternalServerErrorException('Could not retrieve logs');
    return { message: 'Logs retrieved successfully', data: result };
  }

  @Get('ticket/:id_ticket')
  async findByTicket(
    @Param('id_ticket') id_ticket: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const result = await this.logsService.findByTicket(Number(id_ticket), { page, limit });
    if (!result) throw new InternalServerErrorException('Could not retrieve logs by ticket');
    return { message: 'Logs by ticket retrieved successfully', data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateLogTicketDto) {
    const updated = await this.logsService.update(id, dto);
    if (!updated) throw new NotFoundException('Log not found');
    return { message: 'Log updated successfully', data: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.logsService.remove(id);
    if (!deleted) throw new NotFoundException('Log not found');
    return { message: 'Log deleted successfully', data: deleted };
  }
}
