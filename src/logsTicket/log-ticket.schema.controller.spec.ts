import { Test, TestingModule } from '@nestjs/testing';
import { LogsTicketController } from './logs-ticket.controller';
import { LogsTicketService } from './logs-ticket.service';
import { CreateLogTicketDto } from './dto/create-log-ticket.dto';
import { UpdateLogTicketDto } from './dto/update-log-ticket.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('LogsTicketController', () => {
  let controller: LogsTicketController;
  let service: LogsTicketService;

  const mockLogsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByTicket: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsTicketController],
      providers: [
        {
          provide: LogsTicketService,
          useValue: mockLogsService,
        },
      ],
    }).compile();

    controller = module.get<LogsTicketController>(LogsTicketController);
    service = module.get<LogsTicketService>(LogsTicketService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a log successfully', async () => {
      const dto: CreateLogTicketDto = { ticketId: 1, message: 'Test log' } as any;
      mockLogsService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual({ message: 'Log created successfully', data: dto });
      expect(mockLogsService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw InternalServerErrorException if creation fails', async () => {
      mockLogsService.create.mockResolvedValue(null);
      await expect(controller.create({ ticketId: 1, message: 'Test' } as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  
  describe('findAll', () => {
    it('should return logs', async () => {
      const logs = [{ ticketId: 1, message: 'Test' }] as any[];
      mockLogsService.findAll.mockResolvedValue(logs);

      const result = await controller.findAll(1, 10);
      expect(result).toEqual({ message: 'Logs retrieved successfully', data: logs });
    });

    it('should throw InternalServerErrorException if retrieval fails', async () => {
      mockLogsService.findAll.mockResolvedValue(null);
      await expect(controller.findAll(1, 10) as any).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findByTicket', () => {
    it('should return logs by ticket', async () => {
      const logs = [{ ticketId: 1, message: 'Test' }] as any[];
      mockLogsService.findByTicket.mockResolvedValue(logs);

      const result = await controller.findByTicket('1', 1, 10);
      expect(result).toEqual({ message: 'Logs by ticket retrieved successfully', data: logs });
    });

    it('should throw InternalServerErrorException if retrieval fails', async () => {
      mockLogsService.findByTicket.mockResolvedValue(null);
      await expect(controller.findByTicket('1', 1, 10) as any).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update a log successfully', async () => {
      const dto: UpdateLogTicketDto = { message: 'Updated message' } as any;
      mockLogsService.update.mockResolvedValue({ id: '1', ...dto });

      const result = await controller.update('1', dto);
      expect(result).toEqual({ message: 'Log updated successfully', data: { id: '1', ...dto } });
    });

    it('should throw NotFoundException if log not found', async () => {
      mockLogsService.update.mockResolvedValue(null);
      await expect(controller.update('1', { message: 'Test' } as any) as any).rejects.toThrow(
        NotFoundException,
      );
    });
  });


  describe('remove', () => {
    it('should delete a log successfully', async () => {
      mockLogsService.remove.mockResolvedValue({ id: '1' });
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'Log deleted successfully', data: { id: '1' } });
    });

    it('should throw NotFoundException if log not found', async () => {
      mockLogsService.remove.mockResolvedValue(null);
      await expect(controller.remove('1') as any).rejects.toThrow(NotFoundException);
    });
  });
});
