import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // 👈 Add this
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
