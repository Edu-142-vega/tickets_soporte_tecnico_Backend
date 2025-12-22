import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  NotFoundException, InternalServerErrorException, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TecnicoService } from './tecnico.service';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { Tecnico } from './tecnico.entity';

import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('tecnicos')
export class TecnicoController {
  constructor(private readonly tecnicosService: TecnicoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateTecnicoDto) {
    const tecnico = await this.tecnicosService.create(dto);
    if (!tecnico) throw new InternalServerErrorException('Failed to create tecnico');
    return new SuccessResponseDto('Tecnico created successfully', tecnico);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<Tecnico>>> {
    if (query.limit && query.limit > 100) {
      query.limit = 100;
    }

    const result = await this.tecnicosService.findAll(query);
    if (!result) throw new InternalServerErrorException('Could not retrieve tecnicos');

    return new SuccessResponseDto('Tecnicos retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tecnico = await this.tecnicosService.findOne(id);
    if (!tecnico) throw new NotFoundException('Tecnico not found');
    return new SuccessResponseDto('Tecnico retrieved successfully', tecnico);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTecnicoDto) {
    const tecnico = await this.tecnicosService.update(id, dto);
    if (!tecnico) throw new NotFoundException('Tecnico not found');
    return new SuccessResponseDto('Tecnico updated successfully', tecnico);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const tecnico = await this.tecnicosService.remove(id);
    if (!tecnico) throw new NotFoundException('Tecnico not found');
    return new SuccessResponseDto('Tecnico deleted successfully', tecnico);
  }
}
