import { IsString } from 'class-validator';

export class CreateAsignacionTicketDto {
  @IsString()
  id_ticket: string;

  @IsString()
  id_tecnico: string;

  @IsString()
  fecha_asignacion: Date;
}
