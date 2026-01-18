import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: 'UsersService', useValue: {} },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('service definido', () => {
    expect(service).toBeDefined();
  });
});
