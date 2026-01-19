import { Test, TestingModule } from '@nestjs/testing';
import { MensajesTicketController } from './mensajes-ticket.controller';
import { MensajesTicketService } from './mensajes-ticket.service';
import { CreateMensajeTicketDto } from './dto/create-mensaje-ticket.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

describe('MensajesTicketController', () => {
  let controller: MensajesTicketController;
  let service: MensajesTicketService;

  const mockMensajesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByTicket: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensajesTicketController],
      providers: [
        { provide: MensajesTicketService, useValue: mockMensajesService },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({
      canActivate: (context: ExecutionContext) => true,
    })
    .compile();

    controller = module.get<MensajesTicketController>(MensajesTicketController);
    service = module.get<MensajesTicketService>(MensajesTicketService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a mensaje successfully', async () => {
      const dto: CreateMensajeTicketDto = { ticketId: 1, message: 'Hola' } as any;
      mockMensajesService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual({
        message: 'Mensaje created successfully',
        data: dto,
      });
      expect(mockMensajesService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw InternalServerErrorException if creation fails', async () => {
      mockMensajesService.create.mockResolvedValue(null);
      await expect(controller.create({ ticketId: 1, message: 'Test' } as any) as any)
        .rejects.toThrow(InternalServerErrorException);
    });
  });


  describe('findAll', () => {
    it('should return mensajes', async () => {
      const mensajes = [{ ticketId: 1, message: 'Test' }] as any[];
      mockMensajesService.findAll.mockResolvedValue(mensajes);

      const result = await controller.findAll(1, 10);
      expect(result).toEqual({
        message: 'Mensajes retrieved successfully',
        data: mensajes,
      });
    });

    it('should throw InternalServerErrorException if retrieval fails', async () => {
      mockMensajesService.findAll.mockResolvedValue(null);
      await expect(controller.findAll(1, 10) as any)
        .rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findByTicket', () => {
    it('should return mensajes by ticket', async () => {
      const mensajes = [{ ticketId: 1, message: 'Test' }] as any[];
      mockMensajesService.findByTicket.mockResolvedValue(mensajes);

      const result = await controller.findByTicket('1', 1, 10);
      expect(result).toEqual({
        message: 'Mensajes by ticket retrieved successfully',
        data: mensajes,
      });
    });

    it('should throw InternalServerErrorException if retrieval fails', async () => {
      mockMensajesService.findByTicket.mockResolvedValue(null);
      await expect(controller.findByTicket('1', 1, 10) as any)
        .rejects.toThrow(InternalServerErrorException);
    });
  });
});
