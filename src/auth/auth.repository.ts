// src/auth/auth.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as Boom from '@hapi/boom';
import { Prisma } from '@prisma/client';
import { CreateAuthorDto, CreateAuthorZodSchema } from '../author/dto/create-author.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async validateAndCreateAuthor(dto: CreateAuthorDto, hashedPassword: string) {
    // Validate DTO with Zod (this includes password length ≥ 8)
    try {
      CreateAuthorZodSchema.parse(dto);
    } catch (err: any) {
      throw Boom.badRequest(err.errors?.[0]?.message || 'Invalid input');
    }

    // Redundant manual password length check not needed if Zod already covers it
    // BUT you can still keep this line if you want double assurance
    if (dto.password.length < 8) {
      throw Boom.badRequest('Password should be at least 8 characters');
    }

    // Check for duplicate name
    const existingByName = await this.prisma.author.findFirst({
      where: { name: dto.name },
    });
    if (existingByName) throw Boom.conflict('Author with this name already exists');

    // Check for duplicate email
    const existingByEmail = await this.prisma.author.findUnique({
      where: { email: dto.email },
    });
    if (existingByEmail) throw Boom.conflict('Author with this email already exists');

    // Try to create the author
    try {
      return await this.prisma.author.create({
        data: {
          name: dto.name,
          bio: dto.bio,
          email: dto.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw Boom.conflict('Duplicate field value violates unique constraint');
      }
      throw Boom.internal('Unexpected database error');
    }
  }

  async findByEmail(email: string) {
    return this.prisma.author.findUnique({ where: { email } });
  }
}
