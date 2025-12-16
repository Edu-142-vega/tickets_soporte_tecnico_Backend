import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TecnicoService } from 'src/tecnico/tecnico.service';
import { CreateTecnicoDto } from 'src/tecnico/dto/create-tecnico.dto';
import { UpdateTecnicoDto } from 'src/tecnico/dto/update-tecnico.dto';

@Controller('tecnicos')
export class TecnicoController {
  constructor(private readonly tecnicosService: TecnicoService) {}

  @Post()
  create(@Body() createTecnicoDto: CreateTecnicoDto) {
    return this.tecnicosService.create(createTecnicoDto);
  }

  @Get()
  findAll() {
    return this.tecnicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tecnicosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTecnicoDto: UpdateTecnicoDto) {
    return this.tecnicosService.update(id, updateTecnicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecnicosService.remove(id);
  }
}
