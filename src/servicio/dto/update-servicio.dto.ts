import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateServicioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsIn(['servicio', 'producto'])
  tipo?: string;

  @IsOptional()
  @IsString()
  precio?: string;

  @IsOptional()
  @IsIn(['disponible', 'no disponible'])
  estado?: string;

  @IsOptional()
  @IsString()
  fecha_creacion?: string;
}
