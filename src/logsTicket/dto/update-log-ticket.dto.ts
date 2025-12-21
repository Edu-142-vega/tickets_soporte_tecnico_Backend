import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateLogTicketDto {
  @IsOptional()
  @IsNumber()
  id_ticket?: number;

  @IsOptional()
  @IsString()
  estado_anterior?: string;

  @IsOptional()
  @IsString()
  estado_nuevo?: string;

  @IsOptional()
  @IsString()
  accion?: string;

  @IsOptional()
  @IsNumber()
  realizado_por?: number;

  @IsOptional()
  @IsString()
  rol?: string;

  @IsOptional()
  @IsDateString()
  fecha_evento?: Date;

  @IsOptional()
  @IsString()
  observacion?: string;
}

