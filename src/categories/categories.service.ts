import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  create(dto: CreateCategoryDto) {
    return {
      message: 'Categoría creada correctamente',
      category: dto,
    };
  }

  findAll() {
    return [
      {
        id: 1,
        nombre: 'Soporte técnico',
        descripcion: 'Problemas del sistema',
      },
    ];
  }
}
