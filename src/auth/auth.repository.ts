import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.author.findUnique({ where: { email } });
  }

  async findByName(name: string) {
    return this.prisma.author.findFirst({ where: { name } });
  }

  async createAuthor(data: {
    name: string;
    email: string;
    bio: string;
    password: string;
  }) {
    return this.prisma.author.create({ data });
  }
}
