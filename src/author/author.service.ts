import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAuthorDto) {
    return this.prisma.author.create({ data });
  }

  findAll() {
    return this.prisma.author.findMany({ include: { books: true } });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  update(id: number, data: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
