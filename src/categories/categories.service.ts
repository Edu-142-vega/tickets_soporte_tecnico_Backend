import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoriesService {
    findAll() {
        throw new Error("Method not implemented.");
    }
    create(dto: CreateCategoryDto) {
        throw new Error("Method not implemented.");
    }
}
