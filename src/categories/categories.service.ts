import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoriesRepository.create(dto);
      return await this.categoriesRepository.save(category);
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      throw new InternalServerErrorException(
        'No se pudo crear la categoría',
      );
    }
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<Category>> {
    try {
      const queryBuilder = this.categoriesRepository
        .createQueryBuilder('category')
        .orderBy('category.id', 'DESC');

      return await paginate<Category>(queryBuilder, options);
    } catch (error) {
      console.error('Error al listar categorías:', error);
      throw new InternalServerErrorException(
        'No se pudieron obtener las categorías',
      );
    }
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }

      Object.assign(category, dto);
      return await this.categoriesRepository.save(category);
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'No se pudo actualizar la categoría',
      );
    }
  }
}
