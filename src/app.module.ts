import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './book/book.module';

@Module({
  imports: [AuthorModule, BookModule],
  providers: [PrismaService],
  exports: [PrismaService], // optional if used in other modules
})
export class AppModule {}
