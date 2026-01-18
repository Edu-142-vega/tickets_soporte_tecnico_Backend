import { Test } from '@nestjs/testing';
import { AsignacionTicketController } from './asignacion-ticket.controller';
import { AsignacionTicketService } from './asignacion-ticket.service';
import { AuthGuard } from '@nestjs/passport';

describe('AsignacionTicketController', () => {
  let controller: AsignacionTicketController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AsignacionTicketController],
      providers: [{ provide: AsignacionTicketService, useValue: serviceMock }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get(AsignacionTicketController);
  });

  it('create: retorna respuesta', async () => {
    serviceMock.create.mockResolvedValue({});
    const res = await controller.create({} as any);
    expect(res).toBeDefined();
  });
});
