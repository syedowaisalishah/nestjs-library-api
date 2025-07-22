// src/author/author.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAuthorDto) {
    return this.prisma.author.create({ data });
  }

  async findAll() {
    return this.prisma.author.findMany({
      include: { books: true },
    });
  }

  async findById(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  async findByName(name: string) {
    return this.prisma.author.findFirst({
      where: { name },
    });
  }

  async findByEmail(email: string) {
  return this.prisma.author.findUnique({
    where: { email },
  });
}



  async update(id: number, data: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.author.delete({
      where: { id },
    });
  }
}
