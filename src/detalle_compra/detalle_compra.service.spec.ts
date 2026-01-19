import { Test } from '@nestjs/testing';
import { Detalle_comprasService } from './detalle_compra.service';

describe('Detalle_comprasService', () => {
  let service: Detalle_comprasService;

  const detalleRepoMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        Detalle_comprasService,
        { provide: 'Detalle_compraRepository', useValue: detalleRepoMock },
      ],
    }).compile();

    service = module.get(Detalle_comprasService);
    jest.clearAllMocks();
  });

  it('service definido', () => {
    expect(service).toBeDefined();
  });
});
