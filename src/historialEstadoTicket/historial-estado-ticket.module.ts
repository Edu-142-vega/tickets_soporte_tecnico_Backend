import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialEstadoTicketService } from './historial-estado-ticket.service';
import { HistorialEstadoTicketController } from './historial-estado-ticket.controller';
import { HistorialEstadoTicket } from './historialEstadoTicket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialEstadoTicket])],
  controllers: [HistorialEstadoTicketController],
  providers: [HistorialEstadoTicketService],
})
export class HistorialEstadoTicketModule {}
