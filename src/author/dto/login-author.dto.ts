import { z } from 'zod';

export const LoginAuthorZodSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginAuthorDto = z.infer<typeof LoginAuthorZodSchema>;
