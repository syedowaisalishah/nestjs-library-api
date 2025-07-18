import { z } from 'zod';

// Zod schema for creating a book
export const CreateBookZodSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
  publicationYear: z.number().int().gte(0, 'Year must be non-negative'),
  authorId: z.number().int().gte(1, 'Author ID must be a positive number'),
});

// Infer TypeScript type from Zod schema
export type CreateBookDto = z.infer<typeof CreateBookZodSchema>;