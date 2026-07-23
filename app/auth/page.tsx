'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { API_BASE, formatApiError, parseResult } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { panelHome } from '@/lib/roles';
import type { AuthTokens, AuthUser } from '@/lib/types';
import {
  OTP_LENGTH,
  PHONE_LENGTH,
  otpFormSchema,
  phoneFormSchema,
  type OtpFormValues,
  type PhoneFormValues,
} from '@/lib/validations/auth';

type Step = 'phone' | 'code';

function redirectFor(role: AuthUser['role']): string {
  return panelHome(role);
}

export default function LoginSection() {
  const router = useRouter();
  const { setSession } = useAuth();
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const codeInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [serverError, setServerError] = useState('');

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: '' },
    mode: 'onBlur',
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { code: '' },
    mode: 'onSubmit',
  });

  const codeValue = useWatch({ control: otpForm.control, name: 'code', defaultValue: '' });

  const requestOtp = useMutation({
    mutationFn: async (mobile: string) => {
      const res = await fetch(`${API_BASE}/auth/otp/request`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
      return await parseResult<{ expiresInSeconds: number }>(res);
    },
  });

  const verifyOtp = useMutation({
    mutationFn: async (payload: { mobile: string; code: string }) => {
      const res = await fetch(`${API_BASE}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await parseResult<AuthTokens & { user: AuthUser }>(res);
    },
  });

  const busy = requestOtp.isPending || verifyOtp.isPending;

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    if (step === 'phone') phoneInputRef.current?.focus();
    else codeInputRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (step === 'code' && serverError) {
      codeInputRef.current?.select();
    }
  }, [step, serverError]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cooldown]);

  const handleClose = useCallback(() => {
    if (window.history.length > 1) router.back();
    else router.push('/');
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleClose]);

  const onPhoneSubmit = phoneForm.handleSubmit(async (values) => {
    setServerError('');
    try {
      await requestOtp.mutateAsync(values.phone);
      setPhone(values.phone);
      setStep('code');
      setCooldown(90);
      otpForm.reset({ code: '' });
    } catch (error) {
      setServerError(formatApiError(error, 'خطا در ارسال کد.'));
    }
  });

  const onCodeSubmit = otpForm.handleSubmit(async (values) => {
    setServerError('');
    try {
      const data = await verifyOtp.mutateAsync({ mobile: phone, code: values.code });
      setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken }, data.user);
      router.replace(redirectFor(data.user.role));
    } catch (error) {
      const message = formatApiError(error, 'کد وارد شده نادرست است.');
      setServerError(message);
      otpForm.setError('code', { type: 'server', message });
    }
  });

  const handleResend = async () => {
    if (cooldown > 0 || busy) return;
    setServerError('');
    otpForm.clearErrors('code');
    try {
      await requestOtp.mutateAsync(phone);
      setCooldown(90);
    } catch (error) {
      setServerError(formatApiError(error, 'خطا در ارسال مجدد.'));
    }
  };

  const phoneError = phoneForm.formState.errors.phone?.message;
  const codeFieldError = otpForm.formState.errors.code?.message;
  const codeError = codeFieldError ?? serverError;
  const showPhoneError = Boolean(phoneError ?? (step === 'phone' ? serverError : ''));

  const { ref: phoneRegRef, ...phoneReg } = phoneForm.register('phone', {
    onChange: (e: { target: { value: string } }) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, PHONE_LENGTH);
      phoneForm.setValue('phone', digits, {
        shouldValidate: phoneForm.formState.isSubmitted,
      });
      if (serverError) setServerError('');
    },
  });

  const { ref: codeRegRef, ...codeReg } = otpForm.register('code', {
    onChange: (e: { target: { value: string } }) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
      otpForm.setValue('code', digits, { shouldValidate: false });
      if (serverError) setServerError('');
      if (otpForm.formState.errors.code) otpForm.clearErrors('code');
    },
  });

  return (
    <section
      lang="fa"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      className="login-page fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overflow-y-auto px-5"
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="بستن و بازگشت"
        className="login-close fixed top-4 end-4 flex h-11 w-11 items-center justify-center rounded-full sm:top-5 sm:end-5"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="w-full max-w-[380px] py-16">
        {step === 'phone' ? (
          <>
            <h1
              id="login-title"
              className="login-title text-[24px] font-extrabold leading-tight sm:text-[28px]"
            >
              ورود به حساب کاربری
            </h1>
            <p className="login-desc mt-3 text-[14px] leading-6 sm:text-[15px]">
              شماره موبایل خود را وارد کنید تا کد تایید برایتان ارسال شود.
            </p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={onPhoneSubmit} noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="login-label text-sm font-bold">
                  شماره موبایل
                </label>
                <input
                  {...phoneReg}
                  ref={(el) => {
                    phoneRegRef(el);
                    phoneInputRef.current = el;
                  }}
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={PHONE_LENGTH}
                  placeholder="09123456789"
                  dir="ltr"
                  aria-invalid={showPhoneError}
                  className="login-input h-[54px] w-full rounded-2xl px-4 text-[17px] font-bold tracking-wide outline-none sm:h-[56px]"
                />
                <p className="login-error min-h-[18px] text-xs font-medium" role="alert">
                  {phoneError ?? serverError}
                </p>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="login-cta cursor-pointer h-[52px] w-full rounded-2xl text-[16px] font-extrabold tracking-wide"
              >
                {requestOtp.isPending ? 'در حال ارسال…' : 'ارسال کد تایید'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1
              id="login-title"
              className="login-title text-[24px] font-extrabold leading-tight sm:text-[28px]"
            >
              کد تایید را وارد کنید
            </h1>
            <p className="login-desc mt-3 text-[14px] leading-6 sm:text-[15px]">
              کد {OTP_LENGTH} رقمی ارسال‌شده به شماره{' '}
              <span dir="ltr" className="font-bold">
                {phone}
              </span>{' '}
              را وارد کنید.
            </p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={onCodeSubmit} noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="code" className="login-label text-sm font-bold">
                  کد تایید
                </label>
                <input
                  {...codeReg}
                  ref={(el) => {
                    codeRegRef(el);
                    codeInputRef.current = el;
                  }}
                  id="code"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={OTP_LENGTH}
                  placeholder="- - - - -"
                  dir="ltr"
                  aria-invalid={Boolean(codeError)}
                  className="login-input h-[54px] w-full rounded-2xl px-4 text-center text-[22px] font-bold tracking-[0.5em] outline-none sm:h-[56px]"
                />
                <p className="login-error min-h-[18px] text-xs font-medium" role="alert">
                  {codeError}
                </p>
              </div>

              <button
                type="submit"
                disabled={busy || codeValue.length < OTP_LENGTH}
                className="login-cta cursor-pointer h-[52px] w-full rounded-2xl text-[16px] font-extrabold tracking-wide"
              >
                {verifyOtp.isPending ? 'در حال بررسی…' : 'ورود'}
              </button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setServerError('');
                    otpForm.reset({ code: '' });
                  }}
                  className="login-link font-bold"
                >
                  تغییر شماره
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || busy}
                  className="login-link font-bold disabled:opacity-50"
                >
                  {cooldown > 0 ? `ارسال مجدد تا ${cooldown} ثانیه` : 'ارسال مجدد کد'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        .login-page {
          --bg: #f3f6f7;
          --ink: #10242a;
          --muted: #5c6b71;
          --input-bg: #ffffff;
          --input-border: #d7e3e7;
          --input-focus: #7c3aed;
          --brand-1: #a78bfa;
          --brand-2: #8b5cf6;
          --brand-border: #5b21b6;
          --cta-text: #ffffff;
          --cta-disabled-bg: #e3e9eb;
          --cta-disabled-border: #cdd6d9;
          --cta-disabled-text: #a3b0b4;
          --error: #d92d20;
          --close-bg: rgba(16, 36, 42, 0.06);
          --close-ink: #10242a;
          background-color: var(--bg);
        }
        :global(.dark) .login-page {
          --bg: #131f24;
          --ink: #edf3f5;
          --muted: #93a5ac;
          --input-bg: #17242a;
          --input-border: #2c3b42;
          --input-focus: #a78bfa;
          --cta-disabled-bg: #1c2a30;
          --cta-disabled-border: #263640;
          --cta-disabled-text: #4d5c62;
          --error: #ff6a63;
          --close-bg: rgba(255, 255, 255, 0.08);
          --close-ink: #edf3f5;
        }
        .login-title {
          color: var(--ink);
        }
        .login-desc,
        .login-link {
          color: var(--muted);
        }
        .login-link:hover {
          color: var(--input-focus);
        }
        .login-label {
          color: var(--ink);
        }
        .login-error {
          color: var(--error);
        }
        .login-close {
          background-color: var(--close-bg);
          color: var(--close-ink);
          border: none;
          cursor: pointer;
        }
        .login-close:hover {
          background-color: var(--brand-2);
          color: #fff;
        }
        .login-input {
          background: var(--input-bg);
          border: 2px solid var(--input-border);
          color: var(--ink);
        }
        .login-input::placeholder {
          color: var(--muted);
          opacity: 0.6;
        }
        .login-input:focus {
          border-color: var(--input-focus);
        }
        .login-input[aria-invalid='true'] {
          border-color: var(--error);
        }
        .login-cta {
          color: var(--cta-text);
          background-color: var(--brand-2);
          border: none;
          border-bottom: 4px solid var(--brand-border);
        }
        .login-cta:hover:not(:disabled) {
          filter: brightness(0.92);
        }
        .login-cta:active:not(:disabled) {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }
        .login-cta:disabled {
          background-color: var(--cta-disabled-bg);
          border-bottom-color: var(--cta-disabled-border);
          color: var(--cta-disabled-text);
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
