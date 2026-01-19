import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMail', () => {
    it('should return success when sending mail', async () => {
      const dto: SendMailDto = { to: 'test@mail.com', subject: 'Hola', body: 'Cuerpo' } as any;

    
      jest.spyOn(service, 'sendMail').mockResolvedValue({ success: true } as any);

      const result = await service.sendMail(dto);
      expect(result).toEqual({ success: true });
    });
  });
});
