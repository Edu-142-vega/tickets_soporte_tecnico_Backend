import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionTicketService } from './asignacion-ticket.service';
import { AsignacionTicket } from './asignacionTicket.entity';
import { paginate } from 'nestjs-typeorm-paginate';

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn(),
}));

describe('AsignacionTicketService', () => {
  let service: AsignacionTicketService;
  let repo: jest.Mocked<Repository<AsignacionTicket>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AsignacionTicketService,
        {
          provide: getRepositoryToken(AsignacionTicket),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AsignacionTicketService);
    repo = module.get(getRepositoryToken(AsignacionTicket));
  });

  it('create: crea asignacion', async () => {
    repo.create.mockReturnValue({} as any);
    repo.save.mockResolvedValue({ id_asignacion: '1' } as any);

    const res = await service.create({} as any);
    expect(res).toBeDefined();
  });

  it('findAll: pagina resultados', async () => {
    const qb: any = {};
    repo.createQueryBuilder.mockReturnValue(qb);
    (paginate as jest.Mock).mockResolvedValue({ items: [] });

    const res = await service.findAll({ page: 1, limit: 10 });
    expect(res).toBeDefined();
  });
});
