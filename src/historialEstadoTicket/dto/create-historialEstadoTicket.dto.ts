import { IsNotEmpty, IsString, IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateHistorialEstadoTicketDto {
  @IsUUID()
  @IsNotEmpty()
  id_ticket: string;

  @IsString()
  @IsNotEmpty()
  estado_anterior: string;

  @IsString()
  @IsNotEmpty()
  estado_nuevo: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_cambio: string;

  @IsOptional()
  @IsString()
  comentario?: string;
}
