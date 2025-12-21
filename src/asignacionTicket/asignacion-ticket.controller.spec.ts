import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionTicketController } from './asignacion-ticket.controller';

describe('AsignacionTicketController', () => {
  let controller: AsignacionTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignacionTicketController],
    }).compile();

    controller = module.get<AsignacionTicketController>(AsignacionTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
