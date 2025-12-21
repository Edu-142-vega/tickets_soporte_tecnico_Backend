import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosService } from './servicio.service';
import { ServiciosController } from './servicio.controller';
import { Servicio } from './servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio])],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServicioModule {}
