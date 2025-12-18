import { IsString } from 'class-validator';

export class CreateTecnicoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  correo: string;

  @IsString()
  telefono: string;

  @IsString()
  especialidad: string;

  @IsString()
  estado: string;
}
