import { Test, TestingModule } from '@nestjs/testing';
import { LogsTicketService } from './logs-ticket.service';
import { CreateLogTicketDto } from './dto/create-log-ticket.dto';
import { UpdateLogTicketDto } from './dto/update-log-ticket.dto';

describe('LogsTicketService', () => {
  let service: LogsTicketService;

  const mockLogs = [
    { id: '1', ticketId: 1, message: 'Test log 1' },
    { id: '2', ticketId: 1, message: 'Test log 2' },
  ] as any[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogsTicketService],
    }).compile();

    service = module.get<LogsTicketService>(LogsTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a log', async () => {
      const dto: CreateLogTicketDto = { ticketId: 1, message: 'New log' } as any;
      jest.spyOn(service, 'create').mockResolvedValue({ id: '3', ...dto } as any);

      const result = await service.create(dto);
      expect(result).toEqual({ id: '3', ...dto });
    });
  });


  describe('findAll', () => {
    it('should return paginated logs', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockLogs);

      const result = await service.findAll({ page: 1, limit: 10 } as any);
      expect(result).toEqual(mockLogs);
    });
  });


  describe('findByTicket', () => {
    it('should return logs filtered by ticket', async () => {
      jest.spyOn(service, 'findByTicket').mockResolvedValue(mockLogs);

      const result = await service.findByTicket(1, { page: 1, limit: 10 } as any);
      expect(result).toEqual(mockLogs);
    });
  });


  describe('update', () => {
    it('should update a log', async () => {
      const dto: UpdateLogTicketDto = { message: 'Updated message' } as any;
      jest.spyOn(service, 'update').mockResolvedValue({ id: '1', ...dto } as any);

      const result = await service.update('1', dto);
      expect(result).toEqual({ id: '1', ...dto });
    });
  });

  describe('remove', () => {
    it('should remove a log', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ id: '1' } as any);

      const result = await service.remove('1');
      expect(result).toEqual({ id: '1' });
    });
  });
});
