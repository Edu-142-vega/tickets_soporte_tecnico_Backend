import { IsOptional } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional() title?: string;
  @IsOptional() description?: string;
  @IsOptional() priority?: string;
  @IsOptional() category?: string;
}
