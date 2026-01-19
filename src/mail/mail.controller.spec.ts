import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

describe('MailController', () => {
  let controller: MailController;
  let service: MailService;

  const mockMailService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        { provide: MailService, useValue: mockMailService },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({
      canActivate: (context: ExecutionContext) => true,
    })
    .compile();

    controller = module.get<MailController>(MailController);
    service = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendGmail', () => {
    it('should send an email successfully', async () => {
      const dto: SendMailDto = { to: 'test@mail.com', subject: 'Hola', body: 'Cuerpo' } as any;
      const mockResult = { success: true };

      mockMailService.sendMail.mockResolvedValue(mockResult);

      const result = await controller.sendGmail(dto);
      expect(result).toEqual(new SuccessResponseDto('Correo enviado con Gmail', mockResult));
      expect(mockMailService.sendMail).toHaveBeenCalledWith(dto);
    });
  });
});
