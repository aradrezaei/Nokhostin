import { ArrowLeft } from 'lucide-react';

const CONTENT = {
  subheadline:
    'آموزش بدون خستگی در ده‌ها دپارتمان متنوع؛ متد هوشمندی که شما را مستقیم به شرکت‌های پیشرو وصل می‌کند.',
};

export default function HeroSection() {
  return (
    <section
      dir="rtl"
      lang="fa"
      className="hero-academy  flex min-h-[calc(100svh-64px)] items-center overflow-hidden"
    >
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-6 text-center sm:px-6 sm:py-10 lg:py-16">
        {/* headline */}
        <h1 className="max-w-3xl font-bold text-4xl  leading-[1.35] tracking-tight sm:text-4xl sm:leading-[1.3] md:text-5xl lg:text-6xl lg:leading-[1.2]">
          <span className="text-slate-900 dark:text-slate-200 block">تعاملی یاد بگیرید</span>
          <span className="text-slate-900 dark:text-slate-200 block">بدون خستگی پیش برید</span>
        </h1>

        {/* subheadline */}
        <p className="hero-academy__muted mt-4 max-w-xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8">
          {CONTENT.subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-8 cursor-pointer flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
          <button
            type="button"
            className="hero-academy__cta-primary  cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold sm:py-4 sm:text-base"
          >
            شروع کنید
            <span className="hero-academy__cta-primary-label">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
          <a
            href="#fields"
            className="hero-academy__cta-secondary cursor-pointer inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-sm font-bold sm:py-4 sm:text-base"
          >
            مشاوره رایگان
          </a>
        </div>
      </div>
      <style>{`
        .hero-academy {
          --bg: #fcfbff;
          --ink: #211441;
          --muted: #665f7d;
          --brand-1: #7c3aed;
          --brand-2: #c026d3;
          --brand-3: #4c1d95;
          --border: rgba(124, 58, 237, 0.18);
          --surface: rgba(124, 58, 237, 0.05);
          background-color: var(--bg);
        }
        .dark .hero-academy {
          --bg: #131f24;
          --ink: #f5f3ff;
          --muted: #a99fc4;
          --brand-1: #a78bfa;
          --brand-2: #e879f9;
          --brand-3: #ddd6fe;
          --border: rgba(167, 139, 250, 0.28);
          --surface: rgba(124, 58, 237, 0.14);
        }

        /* ---------------- the button ---------------- */
        .hero-academy__cta-primary {
          position: relative;
          overflow: hidden;
          color: #ffffff;
          background-image: linear-gradient(180deg, var(--brand-1) 0%, color-mix(in srgb, var(--brand-1) 88%, black) 100%);
          border: 1px solid color-mix(in srgb, var(--brand-1) 70%, black);
          border-bottom: 4px solid color-mix(in srgb, var(--brand-1) 55%, black);
          box-shadow: 0 2px 0 0 rgba(76, 29, 149, 0.15);
          transform: translateY(0);
          transition: transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 140ms ease, border-bottom-width 90ms ease;
          will-change: transform;
        }
        .hero-academy__cta-primary-label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-academy__cta-primary::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.35) 45%, transparent 62%);
          transform: translateX(-130%);
          transition: transform 600ms ease;
          pointer-events: none;
        }
        .hero-academy__cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px -8px rgba(124, 58, 237, 0.6);
        }
        .hero-academy__cta-primary:hover::after {
          transform: translateX(130%);
        }
        .hero-academy__cta-primary:active {
          transform: translateY(2px);
          border-bottom-width: 1px;
          box-shadow: 0 1px 0 0 rgba(76, 29, 149, 0.15);
        }
        .hero-academy__cta-primary:focus-visible {
          outline: 2px solid var(--brand-1);
          outline-offset: 3px;
        }

        .hero-academy__cta-secondary {
          color: var(--ink);
          background: transparent;
          border: 1px solid var(--border);
          border-bottom: 4px solid var(--border);
          transform: translateY(0);
          transition: transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1), background 140ms ease, border-bottom-width 90ms ease;
        }
        .hero-academy__cta-secondary:hover {
          transform: translateY(-2px);
          background: var(--surface);
        }
        .hero-academy__cta-secondary:active {
          transform: translateY(2px);
          border-bottom-width: 1px;
        }
        .hero-academy__cta-secondary:focus-visible {
          outline: 2px solid var(--brand-1);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-academy__cta-primary,
          .hero-academy__cta-secondary,
          .hero-academy__cta-primary::after {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}