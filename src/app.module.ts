import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';

import { User } from './users/user.entity';
import { Category } from './categories/category.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'soporte_tecnico',
      entities: [User, Category, Comment],
      synchronize: true, 
    }),

    AuthModule,
    UsersModule,
    CategoriesModule,
    CommentsModule,
  ],
})
export class AppModule {}
