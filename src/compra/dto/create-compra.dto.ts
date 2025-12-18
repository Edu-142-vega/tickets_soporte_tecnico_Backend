import { IsString } from 'class-validator';

export class CreateCompraDto {
  @IsString()
  id_cliente: string;

  @IsString()
  fecha_compra: string;

  @IsString()
  metodo_pago: string;

  @IsString()
  total: string;

  @IsString()
  estado: string;
}
