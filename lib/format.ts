import type { WeekDay } from './types';

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

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

let jalaliFormatter: Intl.DateTimeFormat | null = null;
function getJalali(): Intl.DateTimeFormat {
  if (!jalaliFormatter) {
    jalaliFormatter = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return jalaliFormatter;
}

/** Formats an ISO date (or Date) as a Jalali date string in Persian. */
export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '—';
  return getJalali().format(date);
}

/** Human schedule, e.g. «شنبه و دوشنبه · ۱۷:۳۰». */
export function formatSchedule(schedule: { days: WeekDay[]; time: string } | null | undefined): string {
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
