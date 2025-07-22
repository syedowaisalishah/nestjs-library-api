// src/book/book.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    return this.prisma.book.create({ data });
  }

  async findAll() {
    return this.prisma.book.findMany({
      include: { author: true },
    });
  }

  async findById(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }

  async search(query: string) {
    return this.prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { isbn: { contains: query, mode: 'insensitive' } },
          { author: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
      include: { author: true },
    });
  }

 async findByTitleAndAuthor(title: string, authorId: number) {
  return this.prisma.book.findFirst({
    where: { title, authorId },
  });
}

async findByIsbn(isbn: string) {
  return this.prisma.book.findFirst({
    where: { isbn },
  });
}

async findAuthorById(authorId: number) {
  return this.prisma.author.findUnique({ where: { id: authorId } });
}

}
