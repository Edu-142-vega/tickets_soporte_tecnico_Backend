import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionTicketService } from './asignacion-ticket.service';

describe('AsignacionTicketService', () => {
  let service: AsignacionTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsignacionTicketService],
    }).compile();

    service = module.get<AsignacionTicketService>(AsignacionTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
