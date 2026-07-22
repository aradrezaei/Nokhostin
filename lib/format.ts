import type { WeekDay } from './types';

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

/** Converts ASCII digits in a string to Persian digits. */
export function toFa(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]!);
}

export const WEEKDAY_LABEL: Record<WeekDay, string> = {
  saturday: 'شنبه',
  sunday: 'یک‌شنبه',
  monday: 'دوشنبه',
  tuesday: 'سه‌شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنج‌شنبه',
  friday: 'جمعه',
};

export const WEEKDAYS_ORDER: WeekDay[] = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

type Ymd = { y: number; m: number; d: number };

function toYmd(value: Date | string | null | undefined): Ymd | null {
  if (!value) return null;
  if (typeof value === 'string') {
    const m = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
    const dt = new Date(value);
    if (Number.isNaN(dt.getTime())) return null;
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Tehran',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(dt);
    return {
      y: Number(parts.find((p) => p.type === 'year')?.value),
      m: Number(parts.find((p) => p.type === 'month')?.value),
      d: Number(parts.find((p) => p.type === 'day')?.value),
    };
  }
  return {
    y: value.getUTCFullYear(),
    m: value.getUTCMonth() + 1,
    d: value.getUTCDate(),
  };
}

function gregorianToJalali(gy: number, gm: number, gd: number): Ymd {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1]!;
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { y: jy, m: jm, d: jd };
}

/** Formats an ISO date (or Date) as a Jalali date string in Persian. */
export function formatDate(value: string | Date | null | undefined): string {
  const ymd = toYmd(value);
  if (!ymd) return '—';
  const j = gregorianToJalali(ymd.y, ymd.m, ymd.d);
  return toFa(`${j.d} ${JALALI_MONTHS[j.m - 1]} ${j.y}`);
}

/** Compact Jalali date/time for logs. */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '—';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tehran',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const j = gregorianToJalali(Number(get('year')), Number(get('month')), Number(get('day')));
  return toFa(`${j.d} ${JALALI_MONTHS[j.m - 1]} ${j.y} · ${get('hour')}:${get('minute')}`);
}

/** Human schedule, e.g. «شنبه و دوشنبه · ۱۷:۳۰». */
export function formatSchedule(
  schedule: { days: WeekDay[]; time: string } | null | undefined,
): string {
  if (!schedule || schedule.days.length === 0) return '—';
  const ordered = WEEKDAYS_ORDER.filter((d) => schedule.days.includes(d));
  const days = ordered.map((d) => WEEKDAY_LABEL[d]).join(' و ');
  return `${days} · ${toFa(schedule.time)}`;
}

/** Formats a nullable number score, Persian digits, dash when empty. */
export function formatScore(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return toFa(Math.round(value * 100) / 100);
}

export const CLASS_STATUS_LABEL: Record<string, string> = {
  active: 'در حال برگزاری',
  finished: 'پایان‌یافته',
  archived: 'بایگانی',
};

export const ATTENDANCE_LABEL: Record<string, string> = {
  present: 'حاضر',
  absent: 'غایب',
  late: 'تأخیر',
};

export const SESSION_STATUS_LABEL: Record<string, string> = {
  scheduled: 'زمان‌بندی‌شده',
  held: 'برگزارشده',
  canceled: 'لغو‌شده',
};
