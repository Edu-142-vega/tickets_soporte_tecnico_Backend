import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTecnicoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  especialidad: string;

  @IsNotEmpty()
  @IsIn(['activo', 'inactivo'])
  estado: string;
}
