import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDetalle_compraDto {
  @IsNotEmpty()
  @IsString()
  id_compra: string;

  @IsNotEmpty()
  @IsString()
  id_producto: string;

  @IsNotEmpty()
  @IsString()
  cantidad: string;

  @IsNotEmpty()
  @IsString()
  precio_unitario: string;

  @IsNotEmpty()
  @IsString()
  subtotal: string;
}
