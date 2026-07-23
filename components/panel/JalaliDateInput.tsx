'use client';

import {
  JALALI_MONTH_NAMES,
  gregorianIsoToJalali,
  jalaliMonthLength,
  jalaliToGregorianIso,
  toFa,
  todayJalali,
} from '@/lib/format';
import { Select } from '@/components/panel/ui';

/**
 * Shamsi (Jalali) date picker that still emits Gregorian `YYYY-MM-DD`
 * for the API — no native miladi calendar UI.
 */
export default function JalaliDateInput({
  value,
  onChange,
  required,
  id,
  yearRange = 6,
}: {
  /** Gregorian ISO date `YYYY-MM-DD` (API format). */
  value: string;
  onChange: (iso: string) => void;
  required?: boolean;
  id?: string;
  /** Years before/after current Jalali year in the year dropdown. */
  yearRange?: number;
}) {
  const today = todayJalali();
  const parsed = gregorianIsoToJalali(value);
  const jy = parsed?.y ?? today.y;
  const jm = parsed?.m ?? today.m;
  const jd = parsed?.d ?? today.d;

  const years: number[] = [];
  for (let y = today.y - yearRange; y <= today.y + yearRange; y += 1) years.push(y);
  if (!years.includes(jy)) years.push(jy);
  years.sort((a, b) => b - a);

  const daysInMonth = jalaliMonthLength(jy, jm);

  const emit = (y: number, m: number, d: number) => {
    const max = jalaliMonthLength(y, m);
    const day = Math.min(Math.max(1, d), max);
    onChange(jalaliToGregorianIso(y, m, day));
  };

  // Ensure controlled value is always a valid ISO once the user interacts / on first paint with empty.
  const ensureValue = () => {
    if (!value) onChange(jalaliToGregorianIso(jy, jm, Math.min(jd, daysInMonth)));
  };

  return (
    <div className="space-y-2" id={id}>
      <div className="grid grid-cols-3 gap-2" dir="rtl">
        <Select
          aria-label="روز"
          required={required}
          value={String(Math.min(jd, daysInMonth))}
          onFocus={ensureValue}
          onChange={(e) => { emit(jy, jm, Number(e.target.value)); }}
        >
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {toFa(d)}
            </option>
          ))}
        </Select>

        <Select
          aria-label="ماه"
          required={required}
          value={String(jm)}
          onFocus={ensureValue}
          onChange={(e) => { emit(jy, Number(e.target.value), jd); }}
        >
          {JALALI_MONTH_NAMES.map((name, idx) => (
            <option key={name} value={idx + 1}>
              {name}
            </option>
          ))}
        </Select>

        <Select
          aria-label="سال"
          required={required}
          value={String(jy)}
          onFocus={ensureValue}
          onChange={(e) => { emit(Number(e.target.value), jm, jd); }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {toFa(y)}
            </option>
          ))}
        </Select>
      </div>

      <p className="text-[11px] font-bold text-slate-400">
        {value
          ? `تاریخ شمسی: ${toFa(Math.min(jd, daysInMonth))} ${JALALI_MONTH_NAMES[jm - 1]} ${toFa(jy)}`
          : 'روز / ماه / سال شمسی را انتخاب کنید'}
      </p>
    </div>
  );
}
