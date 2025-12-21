import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MensajesTicketService } from './mensajes-ticket.service';
import { MensajesTicketController } from './mensajes-ticket.controller';
import { MensajeTicket, MensajeTicketSchema } from './mensaje-ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MensajeTicket.name, schema: MensajeTicketSchema },
    ]),
  ],
  controllers: [MensajesTicketController],
  providers: [MensajesTicketService],
})
export class MensajesTicketModule {}
