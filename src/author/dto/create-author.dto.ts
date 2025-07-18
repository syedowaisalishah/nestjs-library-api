import { z } from 'zod';

export const CreateAuthorZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type CreateAuthorDto = z.infer<typeof CreateAuthorZodSchema>;