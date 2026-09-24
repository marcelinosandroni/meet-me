// Tipos globais do domínio (compartilhados entre features)

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

export interface MeetingType {
  id: string;
  name: string;
  description: string;
  /** duração em minutos */
  duration: number;
  /** ex.: "Google Meet", "Telefone" */
  location: string;
  color: ThemeColor;
  active: boolean;
}

export interface DaySchedule {
  weekday: Weekday;
  enabled: boolean;
  /** horários no formato HH:mm */
  startHour: string;
  endHour: string;
}

export type ThemeColor = 'indigo' | 'violet' | 'blue' | 'emerald' | 'rose';

export interface HostProfile {
  displayName: string;
  username: string; // slug do link público
  bio: string;
  email: string;
  timezone: string;
  avatarUrl?: string;
  themeColor: ThemeColor;
  googleCalendarConnected: boolean;
}

export interface Booking {
  id: string;
  meetingTypeId: string;
  guestName: string;
  guestEmail: string;
  subject: string;
  notes?: string;
  /** ISO string do início */
  start: string;
  /** ISO string do fim */
  end: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Slot {
  /** ISO string */
  start: string;
  end: string;
  available: boolean;
}

export interface SchedulingConfig {
  profile: HostProfile;
  meetingTypes: MeetingType[];
  weeklySchedule: DaySchedule[];
  /** buffer entre reuniões, em minutos */
  bufferMinutes: number;
  /** máximo de agendamentos por dia */
  dailyLimit: number;
  /** datas bloqueadas (ISO date yyyy-MM-dd) */
  blockedDates: string[];
}
