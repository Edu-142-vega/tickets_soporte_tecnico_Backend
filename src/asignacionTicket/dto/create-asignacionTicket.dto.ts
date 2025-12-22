import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAsignacionTicketDto {
  @IsUUID()
  @IsNotEmpty()
  id_ticket: string;

  @IsUUID()
  @IsNotEmpty()
  id_tecnico: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_asignacion: string;
}
