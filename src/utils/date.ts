import {
  addDays,
  addMinutes,
  differenceInMinutes,
  format,
  isSameDay,
  isBefore,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns';
import type { DaySchedule, Slot } from '../core/types';

/** Converte "HH:mm" para um Date no dia dado */
export function timeToDate(day: Date, hhmm: string): Date {
  const [h, m] = hhmm.split(':').map(Number);
  return setMinutes(setHours(startOfDay(day), h), m);
}

export const toISO = (d: Date): string => d.toISOString();
export const fromISO = (s: string): Date => parseISO(s);
export const fmtDate = (d: Date, pattern = 'EEEE, dd MMMM'): string => format(d, pattern);
export const fmtTime = (d: Date): string => format(d, 'HH:mm');

/**
 * Gera os slots disponíveis de um dia com base na config semanal,
 * duração da reunião, buffer e slots já reservados.
 */
export function generateSlotsForDay(
  day: Date,
  weeklySchedule: DaySchedule[],
  durationMinutes: number,
  bufferMinutes: number,
  takenIntervals: Array<{ start: string; end: string }> = [],
): Slot[] {
  const dow = day.getDay() as DaySchedule['weekday'];
  const schedule = weeklySchedule.find((s) => s.weekday === dow && s.enabled);
  if (!schedule) return [];

  const dayStart = timeToDate(day, schedule.startHour);
  const dayEnd = timeToDate(day, schedule.endHour);
  const now = new Date();

  const slots: Slot[] = [];
  let cursor = dayStart;

  while (differenceInMinutes(dayEnd, cursor) >= durationMinutes) {
    const slotEnd = addMinutes(cursor, durationMinutes);
    const overlapsTaken = takenIntervals.some(
      (t) => isBefore(cursor, parseISO(t.end)) && isBefore(parseISO(t.start), slotEnd),
    );
    const inPast = isBefore(slotEnd, now);
    slots.push({
      start: toISO(cursor),
      end: toISO(slotEnd),
      available: !overlapsTaken && !inPast,
    });
    cursor = addMinutes(slotEnd, bufferMinutes);
  }
  return slots;
}

/** Próximos `count` dias a partir de hoje */
export function upcomingDays(count: number): Date[] {
  return Array.from({ length: count }, (_, i) => addDays(startOfDay(new Date()), i));
}

export function sameDay(a: Date, b: Date): boolean {
  return isSameDay(a, b);
}
