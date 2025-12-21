import { Test, TestingModule } from '@nestjs/testing';
import { ComprasController } from './compra.controller';

describe('ComprasController', () => {
  let controller: ComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComprasController],
    }).compile();

    controller = module.get<ComprasController>(ComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
