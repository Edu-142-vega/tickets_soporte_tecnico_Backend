import { IsOptional, IsString } from 'class-validator';

export class UpdateHistorialEstadoTicketDto {
  @IsString()
  @IsOptional()
  id_ticket: string;

  @IsString()
  @IsOptional()
  estado_anterior: string;

  @IsString()
  @IsOptional()
  estado_nuevo: string;

  @IsString()
  @IsOptional()
  fecha_cambio: Date;

  @IsOptional()
  @IsString()
  comentario?: string;
}
