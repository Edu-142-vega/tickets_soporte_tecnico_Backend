import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query,
  NotFoundException, InternalServerErrorException
} from '@nestjs/common';

import { ServiciosService } from './servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { Servicio } from './servicio.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  async create(@Body() dto: CreateServicioDto) {
    const servicio = await this.serviciosService.create(dto);
    if (!servicio) {
      throw new InternalServerErrorException('Failed to create servicio');
    }
    return new SuccessResponseDto('Servicio created successfully', servicio);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<Servicio>>> {

    if (query.limit && query.limit > 100) {
      query.limit = 100;
    }

    const result = await this.serviciosService.findAll(query);
    if (!result) {
      throw new InternalServerErrorException('Could not retrieve servicios');
    }

    return new SuccessResponseDto('Servicios retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const servicio = await this.serviciosService.findOne(id);
    if (!servicio) {
      throw new NotFoundException('Servicio not found');
    }
    return new SuccessResponseDto('Servicio retrieved successfully', servicio);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServicioDto,
  ) {
    const servicio = await this.serviciosService.update(id, dto);
    if (!servicio) {
      throw new NotFoundException('Servicio not found');
    }
    return new SuccessResponseDto('Servicio updated successfully', servicio);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const servicio = await this.serviciosService.remove(id);
    if (!servicio) {
      throw new NotFoundException('Servicio not found');
    }
    return new SuccessResponseDto('Servicio deleted successfully', servicio);
  }
}
