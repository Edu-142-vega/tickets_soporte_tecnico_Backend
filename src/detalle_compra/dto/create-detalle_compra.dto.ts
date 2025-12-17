import { IsString } from 'class-validator';

export class CreateDetalle_compraDto {
  @IsString()
  name: string;
}
