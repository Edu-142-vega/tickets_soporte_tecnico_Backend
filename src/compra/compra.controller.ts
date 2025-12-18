import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ComprasService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Compra } from './compra.entity';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }

   @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Compra>> {
    limit = limit > 100 ? 100 : limit;
    return this.comprasService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comprasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.comprasService.update(id, updateCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comprasService.remove(id);
  }
}

