import { Test } from '@nestjs/testing';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  const commentRepoMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: 'CommentRepository', useValue: commentRepoMock },
      ],
    }).compile();

    service = module.get(CommentsService);
    jest.clearAllMocks();
  });

  it('service definido', () => {
    expect(service).toBeDefined();
  });
});
