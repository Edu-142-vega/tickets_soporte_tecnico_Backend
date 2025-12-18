import { IsString } from 'class-validator';

export class CreateDetalle_compraDto {
  @IsString()
  id_compra: string;

  @IsString()
  id_producto: string;

  @IsString()
  cantidad: string;

  @IsString()
  precio_unitario: string;

  @IsString()
  subtotal: string;
}
