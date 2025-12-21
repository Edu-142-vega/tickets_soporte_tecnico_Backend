import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateMensajeTicketDto {
  @IsNotEmpty()
  @IsNumber()
  id_ticket: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  rol_usuario: string;

  @IsNotEmpty()
  @IsString()
  mensaje: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_mensaje: Date;

  @IsNotEmpty()
  @IsBoolean()
  leido: boolean;
}
