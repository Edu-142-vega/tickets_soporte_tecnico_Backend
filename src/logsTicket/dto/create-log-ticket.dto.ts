import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateLogTicketDto {
  @IsNotEmpty()
  @IsNumber()
  id_ticket: number;

  @IsNotEmpty()
  @IsString()
  estado_anterior: string;

  @IsNotEmpty()
  @IsString()
  estado_nuevo: string;

  @IsNotEmpty()
  @IsString()
  accion: string;

  @IsNotEmpty()
  @IsNumber()
  realizado_por: number;

  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_evento: Date;

  @IsOptional()
  @IsString()
  observacion?: string;
}
