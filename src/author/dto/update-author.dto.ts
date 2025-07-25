import { z } from 'zod';
import { CreateAuthorZodSchema } from './create-author.dto';

// All fields optional for partial update
export const UpdateAuthorZodSchema = CreateAuthorZodSchema.partial();

export type UpdateAuthorDto = z.infer<typeof UpdateAuthorZodSchema>;