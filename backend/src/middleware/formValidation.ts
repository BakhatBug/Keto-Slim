import { z } from 'zod';

export const createFormSchema = z.object({
  body: z.object({
    gender: z.enum(['male', 'female'], {
      message: 'Gender must be either male or female',
    }),

    fatScale: z
      .number({ message: 'Fat scale must be a number' })
      .min(0, 'Fat scale must be at least 0')
      .max(100, 'Fat scale cannot exceed 100'),

    bmi: z
      .number({ message: 'BMI must be a number' })
      .min(10, 'BMI seems too low')
      .max(60, 'BMI seems too high'),

    calorie: z
      .number({ message: 'Calorie must be a number' })
      .min(1000, 'Calorie target seems too low')
      .max(5000, 'Calorie target seems too high'),

    water: z
      .number({ message: 'Water intake must be a number' })
      .min(0.5, 'Water intake seems too low')
      .max(10, 'Water intake seems too high'),

    weightLoss: z
      .number({ message: 'Weight loss must be a number' })
      .min(0.1, 'Weight loss goal must be positive')
      .max(100, 'Weight loss goal seems unrealistic'),

    days: z
      .number({ message: 'Days must be a number' })
      .min(7, 'Timeline must be at least 7 days')
      .max(365, 'Timeline cannot exceed 365 days'),
  }),
});

export const getFormByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid form ID format'),
  }),
});

export type CreateFormInput = z.infer<typeof createFormSchema>['body'];
export type GetFormByIdParams = z.infer<typeof getFormByIdSchema>['params'];
