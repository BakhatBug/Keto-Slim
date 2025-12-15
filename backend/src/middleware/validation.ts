import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ message: 'Email is required' })
      .email('Invalid email format')
      .trim()
      .toLowerCase(),

    password: z
      .string({ message: 'Password is required' })
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password cannot exceed 100 characters'),

    name: z
      .string({ message: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .trim(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: 'Email is required' })
      .email('Invalid email format')
      .trim()
      .toLowerCase(),

    password: z
      .string({ message: 'Password is required' })
      .min(1, 'Password is required'),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
