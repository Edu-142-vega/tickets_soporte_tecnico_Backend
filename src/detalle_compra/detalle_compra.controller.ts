import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Detalle_comprasService } from './detalle_compra.service';
import { CreateDetalle_compraDto } from './dto/create-detalle_compra.dto';
import { UpdateDetalle_compraDto } from './dto/update-detalle_compra.dto';
import { Detalle_compra } from './detalle_compra.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('detalle_compras')
export class Detalle_comprasController {
  constructor(private readonly detalle_comprasService: Detalle_comprasService) {}

  @Post()
  create(@Body() createDetalle_compraDto: CreateDetalle_compraDto) {
    return this.detalle_comprasService.create(createDetalle_compraDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Detalle_compra>> {
    limit = limit > 100 ? 100 : limit;
    return this.detalle_comprasService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalle_comprasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDetalle_compraDto: UpdateDetalle_compraDto) {
    return this.detalle_comprasService.update(id, updateDetalle_compraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalle_comprasService.remove(id);
  }
}
