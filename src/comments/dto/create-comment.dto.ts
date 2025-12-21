import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  mensaje: string;

  @IsNotEmpty()
  @IsInt()
  ticketId: number;
}
