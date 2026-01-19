import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosController } from './servicio.controller';
import { ServiciosService } from './servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('ServiciosController', () => {
  let controller: ServiciosController;
  let service: ServiciosService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosController],
      providers: [{ provide: ServiciosService, useValue: mockService }],
    }).compile();

    controller = module.get<ServiciosController>(ServiciosController);
    service = module.get<ServiciosService>(ServiciosService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a servicio', async () => {
      const dto: CreateServicioDto = { nombre: 'Servicio 1', descripcion: 'Descripción' } as any;
      mockService.create.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.create(dto);
      expect(result).toEqual({ message: 'Servicio creado exitosamente', data: { id: 1, ...dto } });
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw InternalServerErrorException if creation fails', async () => {
      mockService.create.mockResolvedValue(null);
      await expect(controller.create({ nombre: 'X' } as any)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all servicios', async () => {
      const servicios = [{ id: 1, nombre: 'Servicio 1' }];
      mockService.findAll.mockResolvedValue(servicios);

      const query = { page: 1, limit: 10 };
      const result = await controller.findAll(query as any);

      expect(result).toEqual({ message: 'Servicios recuperados exitosamente', data: servicios });
      expect(mockService.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return a servicio by id', async () => {
      const servicio = { id: 1, nombre: 'Servicio 1' };
      mockService.findOne.mockResolvedValue(servicio);

      const result = await controller.findOne('1');
      expect(result).toEqual({ message: 'Servicio recuperado exitosamente', data: servicio });
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if servicio not found', async () => {
      mockService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a servicio', async () => {
      const dto: UpdateServicioDto = { nombre: 'Servicio actualizado' } as any;
      const updated = { id: 1, ...dto };
      mockService.update.mockResolvedValue(updated);

      const result = await controller.update('1', dto);
      expect(result).toEqual({ message: 'Servicio actualizado exitosamente', data: updated });
      expect(mockService.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException if servicio not found', async () => {
      mockService.update.mockResolvedValue(null);
      await expect(controller.update('1', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a servicio', async () => {
      const removed = { id: 1, nombre: 'Servicio eliminado' };
      mockService.remove.mockResolvedValue(removed);

      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'Servicio eliminado exitosamente', data: removed });
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if servicio not found', async () => {
      mockService.remove.mockResolvedValue(null);
      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
