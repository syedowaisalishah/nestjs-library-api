// src/book/dto/create-book.dto.ts
import { z } from 'zod';

export const CreateBookZodSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
  publicationYear: z.number().int().gte(0, 'Year must be non-negative'),
});

export type CreateBookDto = z.infer<typeof CreateBookZodSchema>;
