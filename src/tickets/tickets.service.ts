import {Ticket, TicketPriority, TicketStatus} from './types/ticket.types';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';

const VALID_STATUS: TicketStatus[] = ['OPEN', 'IN_PROGRESS', ' RESOLVED', 'CLOSED'];
const VALID_PRIORITY: TicketPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

@Injectable()
export class TicketsService {
    private tickets; Ticket[] = [];
    
    create()
}
