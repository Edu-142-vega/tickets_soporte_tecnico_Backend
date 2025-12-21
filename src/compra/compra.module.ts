import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraService } from './compra.service';
import { ComprasController } from './compra.controller';
import { Compra } from './compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra])],
  controllers: [ComprasController],
  providers: [CompraService],
})
export class CompraModule {}

