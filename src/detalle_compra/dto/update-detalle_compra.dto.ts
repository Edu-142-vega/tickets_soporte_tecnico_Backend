import { IsOptional, IsString } from 'class-validator';

export class UpdateDetalle_compraDto {
  @IsString()
  @IsOptional()
  name?: string;
}
