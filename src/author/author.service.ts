// src/author/author.service.ts
import { Injectable } from '@nestjs/common';
import * as Boom from '@hapi/boom';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Prisma } from '@prisma/client';
import { CreateAuthorZodSchema } from './dto/create-author.dto';


@Injectable()
export class AuthorService {
  constructor(private readonly authorRepo: AuthorRepository) {}

async create(data: CreateAuthorDto) {
  // ✅ Run Zod schema validation manually
try {
  CreateAuthorZodSchema.parse(data);
} catch (err) {
  throw Boom.badRequest(err.errors?.[0]?.message || 'Invalid input');
}


  // ✅ Optional stronger password check (if 8 instead of 6)
  if (data.password.length < 8) {
    throw Boom.badRequest('Password should be at least 8 characters');
  }

  const existingByName = await this.authorRepo.findByName(data.name);
  if (existingByName) {
    throw Boom.conflict('Author with this name already exists');
  }

  const existingByEmail = await this.authorRepo.findByEmail(data.email);
  if (existingByEmail) {
    throw Boom.conflict('Author with this email already exists');
  }

  try {
    return await this.authorRepo.create(data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw Boom.conflict('Duplicate field value violates unique constraint');
      }
    }
    throw Boom.internal('Unexpected database error');
  }
}

  findAll() {
    return this.authorRepo.findAll();
  }

  findOne(id: number) {
    return this.authorRepo.findById(id);
  }

  update(id: number, data: UpdateAuthorDto) {
    return this.authorRepo.update(id, data);
  }

  remove(id: number) {
    return this.authorRepo.delete(id);
  }
}
