import { IsOptional, IsString } from 'class-validator';

export class UpdateServicioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  precio?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
