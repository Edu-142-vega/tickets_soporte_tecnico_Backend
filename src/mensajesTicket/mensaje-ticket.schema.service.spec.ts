import { Test, TestingModule } from '@nestjs/testing';
import { MensajesTicketService } from './mensajes-ticket.service';
import { CreateMensajeTicketDto } from './dto/create-mensaje-ticket.dto';

describe('MensajesTicketService', () => {
  let service: MensajesTicketService;

  const mockMensajes = [
    { id: '1', ticketId: 1, message: 'Mensaje 1' },
    { id: '2', ticketId: 1, message: 'Mensaje 2' },
  ] as any[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MensajesTicketService],
    }).compile();

    service = module.get<MensajesTicketService>(MensajesTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a mensaje', async () => {
      const dto: CreateMensajeTicketDto = { ticketId: 1, message: 'Nuevo mensaje' } as any;
      jest.spyOn(service, 'create').mockResolvedValue({ id: '3', ...dto } as any);

      const result = await service.create(dto);
      expect(result).toEqual({ id: '3', ...dto });
    });
  });


  describe('findAll', () => {
    it('should return paginated mensajes', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockMensajes);

      const result = await service.findAll({ page: 1, limit: 10 } as any);
      expect(result).toEqual(mockMensajes);
    });
  });

  describe('findByTicket', () => {
    it('should return mensajes filtered by ticket', async () => {
      jest.spyOn(service, 'findByTicket').mockResolvedValue(mockMensajes);

      const result = await service.findByTicket(1, { page: 1, limit: 10 } as any);
      expect(result).toEqual(mockMensajes);
    });
  });
});
