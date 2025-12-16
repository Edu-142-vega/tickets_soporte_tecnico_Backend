import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { CommentsModule } from "./comments/comments.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule,
    CommentsModule,
  ],
})
export class AppModule {}
