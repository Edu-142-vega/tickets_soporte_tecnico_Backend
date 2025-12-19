import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompraDto {
  @IsNotEmpty()
  @IsString()
  id_cliente: string;

  @IsNotEmpty()
  @IsString()
  fecha_compra: string;

  @IsNotEmpty()
  @IsString()
  metodo_pago: string;

  @IsNotEmpty()
  @IsString()
  total: string;

  @IsNotEmpty()
  @IsIn(['pagado', 'pendiente'])
  estado: string;
}
