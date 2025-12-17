import { IsNumber, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  tipo: string; 

  @IsNumber()
  precio: number; 

  @IsString()
  estado: string;
}
