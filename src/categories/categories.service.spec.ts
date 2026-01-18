import { Test } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get(CategoriesService);
  });

  it('service definido', () => {
    expect(service).toBeDefined();
  });
});
