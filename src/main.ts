import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { DataSource } from 'typeorm';
import { seedUsers } from './db/seeds/user.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // 🚀 EJECUTAR SEMILLA ANTES DE ARRANCAR
  const dataSource = app.get(DataSource);
  try {
    await seedUsers(dataSource);
  } catch (error) {
    console.error('❌ Error ejecutando el seed:', error);
  }

  await app.listen(3000);
  console.log('🚀 Servidor listo en http://localhost:3000');
}
bootstrap();