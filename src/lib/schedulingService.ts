import type { Booking, MeetingType, Slot } from '../core/types';
import { generateSlotsForDay, toISO } from '../utils/date';
import { mockHostConfig } from './mockData';

/**
 * ISchedulingService — contrato do serviço de agendamento.
 * Na MVP usa implementação mock (localStorage); depois Supabase + Google Calendar.
 */
export interface ISchedulingService {
  getHostConfig(username: string): Promise<SchedulingConfigOrError>;
  getAvailableSlots(
    username: string,
    meetingTypeId: string,
    day: Date,
  ): Promise<Slot[]>;
  createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  cancelBooking(id: string): Promise<void>;
}

type SchedulingConfigOrError =
  | { ok: true; config: import('../core/types').SchedulingConfig }
  | { ok: false; error: string };

const BOOKINGS_KEY = 'meetme.bookings';
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function readBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) ?? '[]') as Booking[];
  } catch {
    return [];
  }
}

function writeBookings(list: Booking[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
}

export class MockSchedulingService implements ISchedulingService {
  async getHostConfig(username: string): Promise<SchedulingConfigOrError> {
    await delay(400); // simula latência de rede
    if (username !== mockHostConfig.profile.username) {
      return { ok: false, error: `Host "${username}" não encontrado.` };
    }
    return { ok: true, config: mockHostConfig };
  }

  async getAvailableSlots(
    _username: string,
    meetingTypeId: string,
    day: Date,
  ): Promise<Slot[]> {
    await delay(300);
    const mt = mockHostConfig.meetingTypes.find((m) => m.id === meetingTypeId);
    if (!mt) return [];

    const takenToday = readBookings()
      .filter((b) => b.status === 'confirmed')
      .map((b) => ({ start: b.start, end: b.end }));

    const slots = generateSlotsForDay(
      day,
      mockHostConfig.weeklySchedule,
      mt.duration,
      mockHostConfig.bufferMinutes,
      takenToday,
    );

    // limite diário
    const confirmedForDay = readBookings().filter(
      (b) => b.status === 'confirmed' && new Date(b.start).toDateString() === day.toDateString(),
    ).length;
    if (confirmedForDay >= mockHostConfig.dailyLimit) {
      return slots.map((s) => ({ ...s, available: false }));
    }
    return slots;
  }

  async createBooking(
    data: Omit<Booking, 'id' | 'createdAt' | 'status'>,
  ): Promise<Booking> {
    await delay(600);
    const bookings = readBookings();
    // double-booking prevention
    const conflict = bookings.some(
      (b) =>
        b.status === 'confirmed' &&
        new Date(data.start) < new Date(b.end) &&
        new Date(b.start) < new Date(data.end),
    );
    if (conflict) throw new Error('Este horário acabou de ser reservado. Escolha outro.');

    const booking: Booking = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : toISO(new Date()),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    bookings.push(booking);
    writeBookings(bookings);
    // "envio de email" simulado
    console.info('[email-mock] Confirmação enviada para', booking.guestEmail, 'e', mockHostConfig.profile.email);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    await delay(200);
    return readBookings().sort((a, b) => a.start.localeCompare(b.start));
  }

  async cancelBooking(id: string): Promise<void> {
    await delay(300);
    writeBookings(readBookings().filter((b) => b.id !== id));
  }
}

export type { MeetingType };
