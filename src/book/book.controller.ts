// src/book/book.controller.ts
import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, Query, UseGuards, Req
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, CreateBookZodSchema } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards';
import { Request } from 'express';
import { badRequest } from '@hapi/boom';
import { ZodError } from 'zod';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    try {
      const dto: CreateBookDto = CreateBookZodSchema.parse(body);
      const authorId = (req.user as any).id;
      return this.bookService.create(dto, authorId);
    } catch (err) {
      if (err instanceof ZodError) {
        throw badRequest(err.errors[0].message);
      }
      throw err;
    }
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto, @Req() req) {
    return this.bookService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.bookService.remove(+id);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.bookService.search(q);
  }
}
