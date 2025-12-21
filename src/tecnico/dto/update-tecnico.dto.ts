import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateTecnicoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsIn(['activo', 'inactivo'])
  estado?: string;
}
