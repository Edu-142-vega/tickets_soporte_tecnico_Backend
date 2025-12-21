import { Test, TestingModule } from '@nestjs/testing';
import { HistorialEstadoTicketController } from './historial-estado-ticket.controller';

describe('HistorialEstadoTicketController', () => {
  let controller: HistorialEstadoTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialEstadoTicketController],
    }).compile();

    controller = module.get<HistorialEstadoTicketController>(HistorialEstadoTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
