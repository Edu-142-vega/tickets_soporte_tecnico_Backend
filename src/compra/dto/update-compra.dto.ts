import { IsOptional, IsString } from 'class-validator';

export class UpdateCompraDto {
  @IsOptional()
  @IsString()
  id_cliente?: string;

  @IsOptional()
  @IsString()
  fecha_compra?: string;

  @IsOptional()
  @IsString()
  metodo_pago?: string;

  @IsOptional()
  @IsString()
  total?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
