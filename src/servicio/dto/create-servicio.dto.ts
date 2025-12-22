import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsIn(['servicio', 'producto'])
  tipo: string;

  @IsNotEmpty()
  @IsString()
  precio: string;

  @IsNotEmpty()
  @IsIn(['disponible', 'no disponible'])
  estado: string;

  @IsNotEmpty()
  @IsString()
  fecha_creacion: string;
}
