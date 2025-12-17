import { IsOptional, IsString } from 'class-validator';

export class UpdateAsignacionTicketDto {
  @IsString()
  @IsOptional()
  id_ticket: string;

  @IsString()
  @IsOptional()
  id_tecnico: string;

  @IsString()
  @IsOptional()
  fecha_asignacion: Date;
}
