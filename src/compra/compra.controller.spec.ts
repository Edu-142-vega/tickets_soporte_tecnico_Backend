import { Test } from '@nestjs/testing';
import { ComprasController } from './compra.controller';
import { CompraService } from './compra.service';
import { AuthGuard } from '@nestjs/passport';

describe('ComprasController', () => {
  let controller: ComprasController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ComprasController],
      providers: [{ provide: CompraService, useValue: serviceMock }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get(ComprasController);
    jest.clearAllMocks();
  });

  it('controller definido', () => {
    expect(controller).toBeDefined();
  });
});
