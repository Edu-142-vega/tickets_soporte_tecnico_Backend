import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

export class UpdateHistorialEstadoTicketDto {
  @IsOptional()
  @IsUUID()
  id_ticket?: string;

  @IsOptional()
  @IsString()
  estado_anterior?: string;

  @IsOptional()
  @IsString()
  estado_nuevo?: string;

  @IsOptional()
  @IsDateString()
  fecha_cambio?: string;

  @IsOptional()
  @IsString()
  comentario?: string;
}
