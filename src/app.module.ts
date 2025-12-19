import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TecnicosModule } from './tecnico/tecnico.module';
import { ServicioModule } from './servicio/servicio.module';
import { CompraModule } from './compra/compra.module';
import { Detalle_compraModule } from './detalle_compra/detalle_compra.module';
//import { MongooseModule } from '@nestjs/mongoose';  // Importar Mongoose


@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      //ssl: { rejectUnauthorized: false },
    }),
    TecnicosModule,
    ServicioModule,
    CompraModule,
    Detalle_compraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}





