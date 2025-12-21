import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogsTicketService } from './logs-ticket.service';
import { LogsTicketController } from './logs-ticket.controller';
import { LogTicket, LogTicketSchema } from './log-ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LogTicket.name, schema: LogTicketSchema },
    ]),
  ],
  controllers: [LogsTicketController],
  providers: [LogsTicketService],
})
export class LogsTicketModule {}
