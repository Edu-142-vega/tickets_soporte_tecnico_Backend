import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string; 

  @IsOptional()
  priority?: string; 

  @IsNotEmpty()
  createdBy: string; 
}
