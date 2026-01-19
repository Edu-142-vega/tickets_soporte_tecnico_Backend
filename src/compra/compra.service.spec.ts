import { Test } from '@nestjs/testing';
import { CompraService } from './compra.service';

describe('CompraService', () => {
  let service: CompraService;

  const compraRepoMock = {
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
        CompraService,
        { provide: 'CompraRepository', useValue: compraRepoMock },
      ],
    }).compile();

    service = module.get(CompraService);
    jest.clearAllMocks();
  });

  it('service definido', () => {
    expect(service).toBeDefined();
  });
});
