import { IsOptional, IsString } from 'class-validator';

export class UpdateDetalle_compraDto {
  @IsOptional()
  @IsString()
  id_compra?: string;

  @IsOptional()
  @IsString()
  id_producto?: string;

  @IsOptional()
  @IsString()
  cantidad?: string;

  @IsOptional()
  @IsString()
  precio_unitario?: string;

  @IsOptional()
  @IsString()
  subtotal?: string;
}
