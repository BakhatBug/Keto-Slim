import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    sku: z
      .string({ message: 'Product SKU is required' })
      .trim()
      .toUpperCase()
      .min(3, 'SKU must be at least 3 characters')
      .max(50, 'SKU cannot exceed 50 characters')
      .regex(/^[A-Z0-9-]+$/, 'SKU can only contain uppercase letters, numbers, and hyphens'),

    name: z
      .string({ message: 'Product name is required' })
      .trim()
      .min(3, 'Product name must be at least 3 characters')
      .max(100, 'Product name cannot exceed 100 characters'),

    description: z
      .string({ message: 'Product description is required' })
      .min(10, 'Description must be at least 10 characters')
      .max(2000, 'Description cannot exceed 2000 characters'),

    currency: z
      .enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD'], {
        message: 'Currency must be USD, EUR, GBP, CAD, or AUD',
      })
      .optional()
      .default('USD'),

    price: z
      .number({ message: 'Price must be a number' })
      .positive('Price must be positive')
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        'Price can have maximum 2 decimal places'
      ),

    features: z
      .array(z.string().trim().min(1, 'Feature cannot be empty'))
      .max(20, 'Cannot have more than 20 features')
      .optional()
      .default([]),

    imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),

    category: z.enum(['meal-plan', 'supplement', 'guide', 'bundle'], {
      message: 'Category must be meal-plan, supplement, guide, or bundle',
    }),

    stock: z
      .number({ message: 'Stock must be a number' })
      .int('Stock must be an integer')
      .min(0, 'Stock cannot be negative'),

    isActive: z.boolean().optional().default(true),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  }),
  body: z
    .object({
      sku: z
        .string()
        .trim()
        .toUpperCase()
        .min(3, 'SKU must be at least 3 characters')
        .max(50, 'SKU cannot exceed 50 characters')
        .regex(/^[A-Z0-9-]+$/, 'SKU can only contain uppercase letters, numbers, and hyphens')
        .optional(),

      name: z
        .string()
        .trim()
        .min(3, 'Product name must be at least 3 characters')
        .max(100, 'Product name cannot exceed 100 characters')
        .optional(),

      description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(2000, 'Description cannot exceed 2000 characters')
        .optional(),

      currency: z
        .enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD'])
        .optional(),

      price: z
        .number()
        .positive('Price must be positive')
        .refine(
          (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
          'Price can have maximum 2 decimal places'
        )
        .optional(),

      features: z
        .array(z.string().trim().min(1, 'Feature cannot be empty'))
        .max(20, 'Cannot have more than 20 features')
        .optional(),

      imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),

      category: z
        .enum(['meal-plan', 'supplement', 'guide', 'bundle'])
        .optional(),

      stock: z.number().int('Stock must be an integer').min(0, 'Stock cannot be negative').optional(),

      isActive: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  }),
});

export const getProductsQuerySchema = z.object({
  query: z.object({
    category: z.enum(['meal-plan', 'supplement', 'guide', 'bundle']).optional(),
    search: z.string().optional(),
    minPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    maxPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    inStock: z.enum(['true', 'false']).optional(),
    isActive: z.enum(['true', 'false']).optional().default('true'),
    page: z.string().regex(/^\d+$/).optional().default('1'),
    limit: z.string().regex(/^\d+$/).optional().default('20'),
    sortBy: z.enum(['name', 'price', 'createdAt']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
export type GetProductByIdParams = z.infer<typeof getProductByIdSchema>['params'];
export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>['query'];
