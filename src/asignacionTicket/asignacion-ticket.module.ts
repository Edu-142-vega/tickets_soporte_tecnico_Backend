import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionTicketService } from './asignacion-ticket.service';
import { AsignacionTicketController } from './asignacion-ticket.controller';
import { AsignacionTicket } from './asignacionTicket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsignacionTicket])],
  controllers: [AsignacionTicketController],
  providers: [AsignacionTicketService],
})
export class AsignacionTicketModule {}
