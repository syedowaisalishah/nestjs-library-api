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
