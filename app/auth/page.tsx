'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const PHONE_LEN = 11;
const PHONE_REGEX = /^09\d{9}$/;

export default function LoginSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValid = PHONE_REGEX.test(phone);
  const showError = touched && phone.length > 0 && !isValid;

  // Focus the field on open + lock background scroll while this
  // full-screen view is mounted (also visually covers nav/footer).
  useEffect(() => {
    inputRef.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleClose = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, PHONE_LEN));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setTouched(true);
      if (!isValid || submitting) return;

      setSubmitting(true);
      try {
        // TODO: call your OTP-send API here
        // await sendOtp(phone);
      } finally {
        setSubmitting(false);
      }
    },
    [isValid, submitting]
  );

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
        <h1
          id="login-title"
          className="login-title text-[24px] font-extrabold leading-tight sm:text-[28px]"
        >
          ورود به حساب کاربری
        </h1>
        <p className="login-desc mt-3 text-[14px] leading-6 sm:text-[15px]">
          شماره موبایل خود را وارد کنید تا کد تایید برایتان ارسال شود.
        </p>

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
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
              onBlur={() => setTouched(true)}
              placeholder="09123456789"
              dir="ltr"
              aria-invalid={showError}
              aria-describedby={showError ? 'phone-error' : undefined}
              className="login-input h-[54px] w-full rounded-2xl px-4 text-[17px] font-bold tracking-wide outline-none sm:h-[56px]"
            />
            <p id="phone-error" role="alert" className="login-error min-h-[18px] text-xs font-medium">
              {showError ? 'شماره موبایل وارد شده معتبر نیست.' : ''}
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            className="login-cta cursor-pointer h-[52px] w-full rounded-2xl text-[16px] font-extrabold tracking-wide"
          >
            {submitting ? 'در حال ارسال…' : 'ارسال کد تایید'}
          </button>
          
        </form>
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
          --brand-3: #7c3aed;
          --brand-border: #5b21b6;
          --brand-glow: rgba(124, 58, 237, 0.38);
          --brand-hover: #131f24;
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
          --brand-1: #b39dfb;
          --brand-2: #9061f9;
          --brand-3: #7c3aed;
          --brand-border: #5b21b6;
          --brand-glow: rgba(167, 139, 250, 0.35);
          --brand-hover: #131f24;
          --cta-text: #ffffff;
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
        .login-desc {
          color: var(--muted);
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
          transition: background-color 0.15s ease;
        }
        .login-close:hover {
          background-color: var(--brand-hover);
          color: #ffffff;
        }
        .login-close:focus-visible {
          outline: 2px solid var(--input-focus);
          outline-offset: 2px;
        }

        .login-input {
          background: var(--input-bg);
          border: 2px solid var(--input-border);
          color: var(--ink);
          transition: border-color 0.15s ease;
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
          transition: filter 0.15s ease, border-bottom-width 0.12s ease, transform 0.12s ease;
        }
        .login-cta:hover:not(:disabled) {
          filter: brightness(0.92);
        }
        .login-cta:active:not(:disabled) {
          transform: translateY(2px);
          border-bottom-width: 2px;
          filter: brightness(0.85);
        }
        .login-cta:disabled {
          background-color: var(--cta-disabled-bg);
          border-bottom-color: var(--cta-disabled-border);
          color: var(--cta-disabled-text);
          cursor: not-allowed;
        }
        .login-cta:focus-visible {
          outline: 2px solid var(--brand-1);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .login-cta,
          .login-close,
          .login-input {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}