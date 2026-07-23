import { z } from 'zod';

export const OTP_LENGTH = 5;
export const PHONE_LENGTH = 11;

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^09\d{9}$/, 'شماره موبایل وارد شده معتبر نیست.');

export const otpCodeSchema = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `کد تایید باید ${OTP_LENGTH} رقم باشد.`);

export const phoneFormSchema = z.object({
  phone: phoneSchema,
});

export const otpFormSchema = z.object({
  code: otpCodeSchema,
});

export type PhoneFormValues = z.infer<typeof phoneFormSchema>;
export type OtpFormValues = z.infer<typeof otpFormSchema>;
