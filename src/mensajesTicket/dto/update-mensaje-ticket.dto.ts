import { IsOptional, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class UpdateMensajeTicketDto {
  @IsOptional()
  @IsNumber()
  id_ticket?: number;

  @IsOptional()
  @IsNumber()
  id_usuario?: number;

  @IsOptional()
  @IsString()
  rol_usuario?: string;

  @IsOptional()
  @IsString()
  mensaje?: string;

  @IsOptional()
  @IsDateString()
  fecha_mensaje?: Date;

  @IsOptional()
  @IsBoolean()
  leido?: boolean;
}
