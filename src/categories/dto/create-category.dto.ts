import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  nombre: string;

  
  @IsOptional()
  descripcion?: string;
}
