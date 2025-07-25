// src/author/author.service.ts
import { Injectable } from '@nestjs/common';
import { notFound } from '@hapi/boom';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepo: AuthorRepository) {}

  findAll() {
    return this.authorRepo.findAll();
  }

  async findOne(id: number) {
    const author = await this.authorRepo.findById(id);
    if (!author) throw notFound('Author not found');
    return author;
  }

  async update(id: number, data: UpdateAuthorDto) {
    const existing = await this.authorRepo.findById(id);
    if (!existing) throw notFound('Author not found');

    return this.authorRepo.update(id, data);
  }

  async remove(id: number) {
    const existing = await this.authorRepo.findById(id);
    if (!existing) throw notFound('Author not found');

    return this.authorRepo.delete(id);
  }
}
