import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle_comprasService } from './detalle_compra.service';
import { Detalle_comprasController } from './detalle_compra.controller';
import { Detalle_compra } from './detalle_compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detalle_compra])],
  controllers: [Detalle_comprasController],
  providers: [Detalle_comprasService],
})
export class Detalle_compraModule {}
