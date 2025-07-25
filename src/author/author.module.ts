// src/author/author.module.ts
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
