import { Test } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';

import { Detalle_comprasController } from './detalle_compra.controller';
import { Detalle_comprasService } from './detalle_compra.service';

describe('Detalle_comprasController', () => {
  let controller: Detalle_comprasController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [Detalle_comprasController],
      providers: [{ provide: Detalle_comprasService, useValue: serviceMock }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get(Detalle_comprasController);
  });

  it('controller definido', () => {
    expect(controller).toBeDefined();
  });
});
