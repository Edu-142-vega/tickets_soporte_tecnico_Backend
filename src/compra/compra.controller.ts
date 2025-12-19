import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() dto: CreateCompraDto) {
    return this.compraService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.compraService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compraService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompraDto) {
    return this.compraService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compraService.remove(id);
  }
}
