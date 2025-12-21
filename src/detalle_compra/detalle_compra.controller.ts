import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, NotFoundException, InternalServerErrorException
} from '@nestjs/common';

import { Detalle_comprasService } from './detalle_compra.service';
import { CreateDetalle_compraDto } from './dto/create-detalle_compra.dto';
import { UpdateDetalle_compraDto } from './dto/update-detalle_compra.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Detalle_compra } from './detalle_compra.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('detalle_compras')
export class Detalle_comprasController {
  constructor(private readonly detalle_comprasService: Detalle_comprasService) {}

  @Post()
  async create(@Body() dto: CreateDetalle_compraDto) {
    const detalle = await this.detalle_comprasService.create(dto);
    if (!detalle) throw new InternalServerErrorException('Failed to create detalle_compra');
    return new SuccessResponseDto('Detalle_compra created successfully', detalle);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<Detalle_compra>>> {
    if (query.limit && query.limit > 100) {
      query.limit = 100;
    }

    const result = await this.detalle_comprasService.findAll(query);
    if (!result) throw new InternalServerErrorException('Could not retrieve detalle_compras');

    return new SuccessResponseDto('Detalle_compras retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const detalle = await this.detalle_comprasService.findOne(id);
    if (!detalle) throw new NotFoundException('Detalle_compra not found');
    return new SuccessResponseDto('Detalle_compra retrieved successfully', detalle);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDetalle_compraDto) {
    const detalle = await this.detalle_comprasService.update(id, dto);
    if (!detalle) throw new NotFoundException('Detalle_compra not found');
    return new SuccessResponseDto('Detalle_compra updated successfully', detalle);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const detalle = await this.detalle_comprasService.remove(id);
    if (!detalle) throw new NotFoundException('Detalle_compra not found');
    return new SuccessResponseDto('Detalle_compra deleted successfully', detalle);
  }
}
