import { Injectable } from '@nestjs/common';
import { conflict, badRequest, unauthorized } from '@hapi/boom';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepo: BookRepository) {}

  async create(data: CreateBookDto, authorId: number) {
    const { title, isbn } = data;

    const author = await this.bookRepo.findAuthorById(authorId);
    if (!author) throw badRequest('Author does not exist');

    const [existingTitle, existingIsbn] = await Promise.all([
      this.bookRepo.findByTitleAndAuthor(title, authorId),
      this.bookRepo.findByIsbn(isbn),
    ]);

    if (existingTitle || existingIsbn) {
      throw conflict(
        existingTitle
          ? 'Book with this title already exists for this author'
          : 'A book with this ISBN already exists',
      );
    }

    return this.bookRepo.create({
      title: data.title,
      isbn: data.isbn,
      publicationYear: data.publicationYear,
      author: { connect: { id: authorId } },
    });
  }

  async findAll() {
    return this.bookRepo.findAll();
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findById(id);
    if (!book) throw badRequest('Book not found');
    return book;
  }

  async update(id: number, data: UpdateBookDto, authorId: number) {
    const book = await this.bookRepo.findById(id);
    if (!book) throw badRequest('Book not found');

    if (book.authorId !== authorId) {
      throw unauthorized('You are not allowed to update this book');
    }

    return this.bookRepo.update(id, data);
  }

  async remove(id: number, authorId: number) {
    const book = await this.bookRepo.findById(id);
    if (!book) throw badRequest('Book not found');

    if (book.authorId !== authorId) {
      throw unauthorized('You are not allowed to delete this book');
    }

    return this.bookRepo.delete(id);
  }

  search(query: string) {
    return this.bookRepo.search(query);
  }
}
