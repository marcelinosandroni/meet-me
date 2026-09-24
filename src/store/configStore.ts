import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Booking,
  DaySchedule,
  HostProfile,
  MeetingType,
  SchedulingConfig,
} from '../core/types';
import { mockHostConfig } from '../lib/mockData';

interface ConfigState {
  config: SchedulingConfig;
  bookings: Booking[];
  updateProfile: (patch: Partial<HostProfile>) => void;
  upsertMeetingType: (mt: MeetingType) => void;
  removeMeetingType: (id: string) => void;
  setWeeklySchedule: (schedule: DaySchedule[]) => void;
  setBufferMinutes: (min: number) => void;
  setDailyLimit: (n: number) => void;
  toggleBlockedDate: (isoDate: string) => void;
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
  resetToMock: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: mockHostConfig,
      bookings: [],
      updateProfile: (patch) =>
        set((s) => ({ config: { ...s.config, profile: { ...s.config.profile, ...patch } } })),
      upsertMeetingType: (mt) =>
        set((s) => {
          const exists = s.config.meetingTypes.some((m) => m.id === mt.id);
          const meetingTypes = exists
            ? s.config.meetingTypes.map((m) => (m.id === mt.id ? mt : m))
            : [...s.config.meetingTypes, mt];
          return { config: { ...s.config, meetingTypes } };
        }),
      removeMeetingType: (id) =>
        set((s) => ({
          config: { ...s.config, meetingTypes: s.config.meetingTypes.filter((m) => m.id !== id) },
        })),
      setWeeklySchedule: (weeklySchedule) => set((s) => ({ config: { ...s.config, weeklySchedule } })),
      setBufferMinutes: (bufferMinutes) => set((s) => ({ config: { ...s.config, bufferMinutes } })),
      setDailyLimit: (dailyLimit) => set((s) => ({ config: { ...s.config, dailyLimit } })),
      toggleBlockedDate: (isoDate) =>
        set((s) => {
          const blockedDates = s.config.blockedDates.includes(isoDate)
            ? s.config.blockedDates.filter((d) => d !== isoDate)
            : [...s.config.blockedDates, isoDate];
          return { config: { ...s.config, blockedDates } };
        }),
      addBooking: (b) => set((s) => ({ bookings: [...s.bookings, b] })),
      cancelBooking: (id) =>
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
        })),
      resetToMock: () => set({ config: mockHostConfig, bookings: [] }),
    }),
    { name: 'meetme.config' },
  ),
);
