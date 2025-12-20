import { IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;
}
