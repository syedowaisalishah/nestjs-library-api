// src/book/book.service.ts
import { Injectable } from '@nestjs/common';
import { conflict, internal, badRequest } from '@hapi/boom';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private readonly bookRepo: BookRepository) {}

  async create(data: CreateBookDto) {
  const { authorId } = data
  
  const author = await this.bookRepo.findAuthorById(authorId);
  if (!author) {
    throw badRequest('Author does not exist');
  }

  const existingTitle = await this.bookRepo.findByTitleAndAuthor(data.title, data.authorId);
  if (existingTitle) {
    throw conflict('Book with this title already exists for this author');
  }
  console.log(existingTitle)
  const existingIsbn = await this.bookRepo.findByIsbn(data.isbn);
  if (existingIsbn) {
    throw conflict('A book with this ISBN already exists');
  }
  console.log(existingTitle)

  try {
    return await this.bookRepo.create(data);
  } catch (error) {
    throw internal('Unexpected database error');
  }
}

  findAll() {
    return this.bookRepo.findAll();
  }

  findOne(id: number) {
    return this.bookRepo.findById(id);
  }

  update(id: number, data: UpdateBookDto) {
    return this.bookRepo.update(id, data);
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }

  search(query: string) {
    return this.bookRepo.search(query);
  }
}
