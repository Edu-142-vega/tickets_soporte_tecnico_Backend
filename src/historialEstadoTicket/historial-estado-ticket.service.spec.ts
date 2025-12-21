import { Test, TestingModule } from '@nestjs/testing';
import { HistorialEstadoTicketService } from './historial-estado-ticket.service';

describe('HistorialEstadoTicketService', () => {
  let service: HistorialEstadoTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialEstadoTicketService],
    }).compile();

    service = module.get<HistorialEstadoTicketService>(HistorialEstadoTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
