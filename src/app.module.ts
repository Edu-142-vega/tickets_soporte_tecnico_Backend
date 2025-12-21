import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { AsignacionTicketModule } from './asignacionTicket/asignacion-ticket.module';
import { HistorialEstadoTicketModule } from './historialEstadoTicket/historial-estado-ticket.module';
import { TecnicosModule } from './tecnico/tecnico.module';
import { ServicioModule } from './servicio/servicio.module';
import { CompraModule } from './compra/compra.module';
import { Detalle_compraModule } from './detalle_compra/detalle_compra.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';

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
    }),
    UsersModule,
    CategoriesModule,
    CommentsModule,
    TicketsModule,
    AsignacionTicketModule,
    HistorialEstadoTicketModule,
    TecnicosModule,
    ServicioModule,
    CompraModule,
    Detalle_compraModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
