import { z } from 'zod';

export const CreateAuthorZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type CreateAuthorDto = z.infer<typeof CreateAuthorZodSchema>;
