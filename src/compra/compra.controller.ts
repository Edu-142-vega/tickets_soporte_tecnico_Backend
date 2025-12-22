import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query,
  NotFoundException, InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';

import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { Compra } from './compra.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('compras')
export class ComprasController {
  constructor(private readonly compraService: CompraService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateCompraDto) {
    const compra = await this.compraService.create(dto);
    if (!compra) throw new InternalServerErrorException('Failed to create compra');
    return new SuccessResponseDto('Compra created successfully', compra);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<Compra>>> {
    if (query.limit && query.limit > 100) query.limit = 100;

    const result = await this.compraService.findAll(query);
    if (!result) throw new InternalServerErrorException('Could not retrieve compras');

    return new SuccessResponseDto('Compras retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const compra = await this.compraService.findOne(id);
    if (!compra) throw new NotFoundException('Compra not found');
    return new SuccessResponseDto('Compra retrieved successfully', compra);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCompraDto) {
    const compra = await this.compraService.update(id, dto);
    if (!compra) throw new NotFoundException('Compra not found');
    return new SuccessResponseDto('Compra updated successfully', compra);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const compra = await this.compraService.remove(id);
    if (!compra) throw new NotFoundException('Compra not found');
    return new SuccessResponseDto('Compra deleted successfully', compra);
  }
}
