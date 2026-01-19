import { Test } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { HistorialEstadoTicketController } from './historial-estado-ticket.controller';
import { HistorialEstadoTicketService } from './historial-estado-ticket.service';
import { CreateHistorialEstadoTicketDto } from './dto/create-historialEstadoTicket.dto';
import { UpdateHistorialEstadoTicketDto } from './dto/update-historialEstadoTicket.dto';
import { SuccessResponseDto } from 'src/common/dto/response.dto';

describe('HistorialEstadoTicketController', () => {
  let controller: HistorialEstadoTicketController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HistorialEstadoTicketController],
      providers: [{ provide: HistorialEstadoTicketService, useValue: serviceMock }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get(HistorialEstadoTicketController);
    jest.clearAllMocks();
  });

  it('controller definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debe crear un historial', async () => {
      const dto: CreateHistorialEstadoTicketDto = {
        id_ticket: '123',
        estado_anterior: '',
        estado_nuevo: '',
        fecha_cambio: ''
      };
      const mockHistorial = { id: 1, ...dto };
      serviceMock.create.mockResolvedValue(mockHistorial);

      const result = await controller.create(dto);
      expect(result).toEqual(new SuccessResponseDto('HistorialEstadoTicket created successfully', mockHistorial));
      expect(serviceMock.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debe retornar todos los historiales', async () => {
      const mockHistorales = [
        { id: 1, id_ticket: '123' },
        { id: 2, id_ticket: '124' },
      ];
      serviceMock.findAll.mockResolvedValue(mockHistorales);

      const result = await controller.findAll({ page: 1, limit: 10 } as any);
      expect(result).toEqual(new SuccessResponseDto('HistorialEstadoTicket retrieved successfully', mockHistorales));
      expect(serviceMock.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('debe retornar historial por id', async () => {
      const mockHistorial = { id: 1, id_ticket: '123' };
      serviceMock.findOne.mockResolvedValue(mockHistorial);

      const result = await controller.findOne('1');
      expect(result).toEqual(new SuccessResponseDto('HistorialEstadoTicket retrieved successfully', mockHistorial));
      expect(serviceMock.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('debe actualizar historial', async () => {
      const updateDto: UpdateHistorialEstadoTicketDto = {};
      const mockHistorial = { id: 1, id_ticket: '123' };
      serviceMock.update.mockResolvedValue(mockHistorial);

      const result = await controller.update('1', updateDto);
      expect(result).toEqual(new SuccessResponseDto('HistorialEstadoTicket updated successfully', mockHistorial));
      expect(serviceMock.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('debe eliminar historial', async () => {
      const mockHistorial = { id: 1, id_ticket: '123' };
      serviceMock.remove.mockResolvedValue(mockHistorial);

      const result = await controller.remove('1');
      expect(result).toEqual(new SuccessResponseDto('HistorialEstadoTicket deleted successfully', mockHistorial));
      expect(serviceMock.remove).toHaveBeenCalledWith('1');
    });
  });
});
