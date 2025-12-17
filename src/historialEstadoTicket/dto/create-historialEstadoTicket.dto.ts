import { IsOptional, IsString } from 'class-validator';

export class CreateHistorialEstadoTicketDto {
  @IsString()
  id_ticket: string;

  @IsString()
  estado_anterior: string;

  @IsString()
  estado_nuevo: string;

  @IsString()
  fecha_cambio: Date;

  @IsOptional()
  @IsString()
  comentario?: string;
}
