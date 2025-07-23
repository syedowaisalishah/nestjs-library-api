// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { DecodeTokenMiddleware } from './common/middleware/decode-token.middleware';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    AuthModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodeTokenMiddleware)
      .forRoutes('*'); // You can also use specific routes like { path: 'books', method: RequestMethod.GET }
  }
}
