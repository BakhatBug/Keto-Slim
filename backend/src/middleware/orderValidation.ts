import { z } from 'zod';

const orderItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  quantity: z
    .number({ message: 'Quantity must be a number' })
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity cannot exceed 100'),
});

const shippingInfoSchema = z.object({
  fullName: z
    .string({ message: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters'),

  email: z
    .string({ message: 'Email is required' })
    .email('Invalid email address')
    .toLowerCase(),

  phone: z
    .string({ message: 'Phone number is required' })
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),

  address: z
    .string({ message: 'Address is required' })
    .min(5, 'Address must be at least 5 characters'),

  city: z
    .string({ message: 'City is required' })
    .min(2, 'City must be at least 2 characters'),

  state: z
    .string({ message: 'State is required' })
    .min(2, 'State must be at least 2 characters'),

  zipCode: z
    .string({ message: 'Zip code is required' })
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),

  country: z.string().default('USA'),
});

export const createOrderSchema = z.object({
  body: z.object({
    items: z
      .array(orderItemSchema)
      .min(1, 'Order must have at least one item')
      .max(50, 'Order cannot have more than 50 items'),

    currency: z
      .enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD'], {
        message: 'Currency must be USD, EUR, GBP, CAD, or AUD',
      })
      .optional()
      .default('USD'),

    paymentMethod: z.enum(['credit-card', 'paypal', 'stripe', 'cash-on-delivery'], {
      message: 'Invalid payment method',
    }),

    shippingInfo: shippingInfoSchema,

    notes: z
      .string()
      .max(500, 'Notes cannot exceed 500 characters')
      .optional(),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID format'),
  }),
  body: z.object({
    status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], {
      message: 'Invalid order status',
    }),
    paymentStatus: z
      .enum(['pending', 'completed', 'failed', 'refunded'])
      .optional(),
  }),
});

export const getOrderByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID format'),
  }),
});

export const getOrdersQuerySchema = z.object({
  query: z.object({
    status: z
      .enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
      .optional(),
    paymentStatus: z
      .enum(['pending', 'completed', 'failed', 'refunded'])
      .optional(),
    page: z.string().regex(/^\d+$/).optional().default('1'),
    limit: z.string().regex(/^\d+$/).optional().default('20'),
    sortBy: z.enum(['createdAt', 'totalAmount']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>['body'];
export type GetOrderByIdParams = z.infer<typeof getOrderByIdSchema>['params'];
export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>['query'];
