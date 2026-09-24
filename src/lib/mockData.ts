import type { SchedulingConfig } from '../core/types';

/** Dados mock do host (substituídos por Supabase nas fases futuras) */
export const mockHostConfig: SchedulingConfig = {
  profile: {
    displayName: 'Marcelino',
    username: 'marcelino',
    bio: 'Dev em busca de novas oportunidades. Vamos conversar sobre frontend, React e TypeScript?',
    email: 'marcelino@example.com',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    themeColor: 'indigo',
    googleCalendarConnected: false,
  },
  meetingTypes: [
    {
      id: 'mt-15',
      name: 'Reunião rápida',
      description: 'Um papo curto para nos conhecermos.',
      duration: 15,
      location: 'Google Meet',
      color: 'emerald',
      active: true,
    },
    {
      id: 'mt-30',
      name: 'Reunião padrão',
      description: 'Conversa de 30 minutos sobre experiência e expectativas.',
      duration: 30,
      location: 'Google Meet',
      color: 'indigo',
      active: true,
    },
    {
      id: 'mt-45',
      name: 'Entrevista',
      description: 'Entrevista técnica com recrutador.',
      duration: 45,
      location: 'Google Meet',
      color: 'violet',
      active: true,
    },
    {
      id: 'mt-60',
      name: 'Reunião longa',
      description: 'Sessão completa de deep dive.',
      duration: 60,
      location: 'Google Meet',
      color: 'blue',
      active: true,
    },
  ],
  weeklySchedule: [
    { weekday: 0, enabled: false, startHour: '09:00', endHour: '17:00' },
    { weekday: 1, enabled: true, startHour: '09:00', endHour: '12:00' },
    { weekday: 2, enabled: true, startHour: '09:00', endHour: '18:00' },
    { weekday: 3, enabled: true, startHour: '09:00', endHour: '18:00' },
    { weekday: 4, enabled: true, startHour: '09:00', endHour: '18:00' },
    { weekday: 5, enabled: true, startHour: '09:00', endHour: '13:00' },
    { weekday: 6, enabled: false, startHour: '09:00', endHour: '17:00' },
  ],
  bufferMinutes: 15,
  dailyLimit: 6,
  blockedDates: [],
};
