'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE, ApiError, parseResult } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { panelHome } from '@/lib/roles';
import type { AuthTokens, AuthUser } from '@/lib/types';

const PHONE_LEN = 11;
const PHONE_REGEX = /^09\d{9}$/;

type Step = 'phone' | 'code';

function redirectFor(role: AuthUser['role']): string {
  return panelHome(role);
}

export default function LoginSection() {
  const router = useRouter();
  const { setSession } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const isValidPhone = PHONE_REGEX.test(phone);
  const showError = touched && phone.length > 0 && !isValidPhone;

  useEffect(() => {
    inputRef.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [step]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => { setCooldown((c) => c - 1); }, 1000);
    return () => { clearTimeout(timer); };
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
    return () => { window.removeEventListener('keydown', onKeyDown); };
  }, [handleClose]);

  const requestOtp = useCallback(async () => {
    const res = await fetch(`${API_BASE}/auth/otp/request`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ mobile: phone }),
    });
    await parseResult<{ expiresInSeconds: number }>(res);
  }, [phone]);

  const handlePhoneSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTouched(true);
      setServerError('');
      if (!isValidPhone || submitting) return;

      setSubmitting(true);
      try {
        await requestOtp();
        setStep('code');
        setCooldown(90);
      } catch (error) {
        setServerError(error instanceof ApiError ? error.message : 'خطا در ارسال کد.');
      } finally {
        setSubmitting(false);
      }
    },
    [isValidPhone, submitting, requestOtp],
  );

  const handleCodeSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setServerError('');
      if (code.length < 4 || submitting) return;

      setSubmitting(true);
      try {
        const res = await fetch(`${API_BASE}/auth/otp/verify`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ mobile: phone, code }),
        });
        const data = await parseResult<AuthTokens & { user: AuthUser }>(res);
        setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken }, data.user);
        router.replace(redirectFor(data.user.role));
      } catch (error) {
        setServerError(error instanceof ApiError ? error.message : 'کد وارد شده نادرست است.');
      } finally {
        setSubmitting(false);
      }
    },
    [code, phone, submitting, setSession, router],
  );

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || submitting) return;
    setSubmitting(true);
    setServerError('');
    try {
      await requestOtp();
      setCooldown(90);
    } catch (error) {
      setServerError(error instanceof ApiError ? error.message : 'خطا در ارسال مجدد.');
    } finally {
      setSubmitting(false);
    }
  }, [cooldown, submitting, requestOtp]);

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, PHONE_LEN));
  }, []);

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

            <form className="mt-8 flex flex-col gap-5" onSubmit={handlePhoneSubmit} noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="login-label text-sm font-bold">
                  شماره موبایل
                </label>
                <input
                  ref={inputRef}
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={PHONE_LEN}
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => { setTouched(true); }}
                  placeholder="09123456789"
                  dir="ltr"
                  aria-invalid={showError}
                  className="login-input h-[54px] w-full rounded-2xl px-4 text-[17px] font-bold tracking-wide outline-none sm:h-[56px]"
                />
                <p className="login-error min-h-[18px] text-xs font-medium" role="alert">
                  {showError ? 'شماره موبایل وارد شده معتبر نیست.' : serverError}
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="login-cta cursor-pointer h-[52px] w-full rounded-2xl text-[16px] font-extrabold tracking-wide"
              >
                {submitting ? 'در حال ارسال…' : 'ارسال کد تایید'}
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
              کد ارسال‌شده به شماره{' '}
              <span dir="ltr" className="font-bold">
                {phone}
              </span>{' '}
              را وارد کنید.
            </p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleCodeSubmit} noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="code" className="login-label text-sm font-bold">
                  کد تایید
                </label>
                <input
                  ref={inputRef}
                  id="code"
                  name="code"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 8)); }}
                  placeholder="- - - - -"
                  dir="ltr"
                  className="login-input h-[54px] w-full rounded-2xl px-4 text-center text-[22px] font-bold tracking-[0.5em] outline-none sm:h-[56px]"
                />
                <p className="login-error min-h-[18px] text-xs font-medium" role="alert">
                  {serverError}
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting || code.length < 4}
                className="login-cta cursor-pointer h-[52px] w-full rounded-2xl text-[16px] font-extrabold tracking-wide"
              >
                {submitting ? 'در حال بررسی…' : 'ورود'}
              </button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setCode('');
                    setServerError('');
                  }}
                  className="login-link font-bold"
                >
                  تغییر شماره
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0}
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
