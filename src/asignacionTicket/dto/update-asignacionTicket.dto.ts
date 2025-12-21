import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class UpdateAsignacionTicketDto {
  @IsOptional()
  @IsUUID()
  id_ticket?: string;

  @IsOptional()
  @IsUUID()
  id_tecnico?: string;

  @IsOptional()
  @IsDateString()
  fecha_asignacion?: string;
}
