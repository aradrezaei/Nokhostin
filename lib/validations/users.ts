import { z } from 'zod';
import { phoneSchema } from '@/lib/validations/auth';

export const createUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد.')
    .max(80, 'نام بیش از حد طولانی است.'),
  mobile: phoneSchema,
  studentType: z.enum(['in_person', 'online']),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
