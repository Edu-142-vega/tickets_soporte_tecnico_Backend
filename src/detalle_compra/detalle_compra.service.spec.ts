import { Test } from '@nestjs/testing';
import { Detalle_comprasService } from './detalle_compra.service';

describe('DetalleComprasService', () => {
  let service: Detalle_comprasService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [Detalle_comprasService],
    }).compile();

    service = module.get(Detalle_comprasService);
  });

  it('service definido', () => {
    expect(service).toBeDefined();
  });
});
