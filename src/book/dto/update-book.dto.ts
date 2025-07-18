import { z } from 'zod';
import { CreateBookZodSchema } from './create-book.dto';

// Zod schema for updating a book (all fields optional)
export const UpdateBookZodSchema = CreateBookZodSchema.partial();

// Infer TypeScript type from Zod schema
export type UpdateBookDto = z.infer<typeof UpdateBookZodSchema>;