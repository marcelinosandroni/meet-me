import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, CheckCircle2, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Booking, MeetingType, SchedulingConfig, Slot } from '../../core/types';
import type { ISchedulingService } from '../../lib/schedulingService';
import { useDi } from '../../hooks/useDi';
import { fmtDate, fmtTime } from '../../utils/date';
import { Badge, Card, Skeleton, themeAccent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input, Textarea } from '../../components/Input';
import { BookingCalendar } from '../calendar/BookingCalendar';
import { ErrorBoundary } from './ErrorBoundary';

type Step = 'type' | 'datetime' | 'details' | 'done';

export function PublicSchedulePage() {
  return (
    <ErrorBoundary>
      <ScheduleFlow />
    </ErrorBoundary>
  );
}

function ScheduleFlow() {
  const { hostId = 'marcelino' } = useParams();
  const navigate = useNavigate();
  const service = useDi<ISchedulingService>('schedulingService');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<SchedulingConfig | undefined>();

  const [step, setStep] = useState<Step>('type');
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    service.getHostConfig(hostId).then((res) => {
      if (!alive) return;
      if (res.ok) setConfig(res.config as typeof config);
      else setError(res.error);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [hostId, service]);

  const loadSlots = useCallback(
    (day: Date, mt: MeetingType) => {
      setSlots(null);
      setSelectedSlot(null);
      service.getAvailableSlots(hostId, mt.id, day).then(setSlots);
    },
    [hostId, service],
  );

  const pickDate = (day: Date) => {
    setSelectedDate(day);
    if (meetingType) loadSlots(day, meetingType);
  };

  const isBlockedDay = (d: Date) =>
    !!config?.blockedDates.includes(format(d, 'yyyy-MM-dd'));

  if (loading) return <LoadingSkeleton />;
  if (error || !config) {
    return (
      <div role="alert" className="mx-auto max-w-md p-10 text-center">
        <p className="text-4xl" aria-hidden="true">🔍</p>
        <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Link inválido</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{error ?? 'Configuração não encontrada.'}</p>
        <Button variant="secondary" className="mt-6" onClick={() => navigate('/')}>
          Voltar ao início
        </Button>
      </div>
    );
  }

  const accent = themeAccent[config.profile.themeColor];
  const activeTypes = config.meetingTypes.filter((m) => m.active);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Cabeçalho do host */}
      <Card className="mb-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md ${accent.dot}`}
          aria-hidden="true"
        >
          {config.profile.displayName.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {step !== 'type' && (
              <button
                type="button"
                onClick={() => setStep('type')}
                aria-label="Voltar para seleção de tipo de reunião"
                className="mr-2 inline-flex rounded-lg p-1 align-middle text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            {config.profile.displayName}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{config.profile.bio}</p>
          <Badge tone="neutral" className="mt-2 capitalize">
            🌐 {config.profile.timezone}
          </Badge>
        </div>
      </Card>

      {/* STEP 1 — tipos de reunião */}
      {step === 'type' && (
        <section aria-label="Tipos de reunião">
          <ul className="space-y-3">
            {activeTypes.map((mt) => {
              const a = themeAccent[mt.color];
              return (
                <li key={mt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setMeetingType(mt);
                      setStep('datetime');
                      if (selectedDate) loadSlots(selectedDate, mt);
                    }}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-indigo-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
                  >
                    <span className="flex items-center gap-4">
                      <span className={`h-10 w-1.5 shrink-0 rounded-full ${a.dot}`} aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-slate-900 dark:text-white">{mt.name}</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400">{mt.description}</span>
                        <span className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} aria-hidden="true" /> {mt.duration} min
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} aria-hidden="true" /> {mt.location}
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className={`hidden text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 sm:block ${a.text}`}>
                      Selecionar →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* STEP 2 — data + hora */}
      {step === 'datetime' && meetingType && (
        <Card aria-label="Seleção de data e horário">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            <strong className="font-semibold">{meetingType.name}</strong> · {meetingType.duration} min ·{' '}
            {config.bufferMinutes} min de buffer entre reuniões
          </p>
          <BookingCalendar
            month={selectedDate ?? new Date()}
            selectedDate={selectedDate}
            onSelectDate={pickDate}
            slots={slots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            isBlocked={isBlockedDay}
          />
          <div className="mt-6 flex justify-end">
            <Button disabled={!selectedSlot} onClick={() => setStep('details')}>
              Continuar →
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3 — dados do guest */}
      {step === 'details' && meetingType && selectedSlot && (
        <GuestForm
          slot={selectedSlot}
          meetingType={meetingType}
          hostEmail={config.profile.email}
          onCancel={() => setStep('datetime')}
          onConfirm={async (data) => {
            const booking = await service.createBooking({
              meetingTypeId: meetingType.id,
              start: selectedSlot.start,
              end: selectedSlot.end,
              ...data,
            });
            setConfirmed(booking);
            setStep('done');
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          }}
        />
      )}

      {/* STEP 4 — confirmação */}
      {step === 'done' && confirmed && meetingType && (
        <Card className="text-center" role="status">
          <CheckCircle2 size={56} className="mx-auto text-emerald-500" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Reunião confirmada! 🎉</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enviamos a confirmação por email para <strong>{confirmed.guestEmail}</strong> e para o host.
          </p>
          <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl bg-slate-50 p-4 text-left text-sm dark:bg-slate-900/60">
            <Row label="Tipo" value={`${meetingType.name} (${meetingType.duration} min)`} />
            <Row label="Data" value={fmtDate(new Date(confirmed.start), "EEEE, dd 'de' MMMM")} />
            <Row label="Horário" value={`${fmtTime(new Date(confirmed.start))} – ${fmtTime(new Date(confirmed.end))}`} />
            <Row label="Local" value={meetingType.location} />
            <Row label="Assunto" value={confirmed.subject} />
          </dl>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setStep('type');
                setSelectedSlot(null);
                setConfirmed(null);
              }}
            >
              Agendar outro horário
            </Button>
            <Link to="/admin" className="contents">
              <Button variant="ghost">Ver no painel admin</Button>
            </Link>
          </div>
        </Card>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}

interface GuestFormData {
  guestName: string;
  guestEmail: string;
  subject: string;
  notes?: string;
}

function GuestForm({
  slot,
  meetingType,
  hostEmail,
  onCancel,
  onConfirm,
}: {
  slot: Slot;
  meetingType: MeetingType;
  hostEmail: string;
  onCancel: () => void;
  onConfirm: (data: GuestFormData) => Promise<void>;
}) {
  const [form, setForm] = useState<GuestFormData>({ guestName: '', guestEmail: '', subject: '', notes: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof GuestFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (form.guestName.trim().length < 2) e.guestName = 'Informe seu nome completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.guestEmail)) e.guestEmail = 'Email inválido.';
    if (form.subject.trim().length < 3) e.subject = 'Descreva o assunto da reunião.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onConfirm({ ...form, notes: form.notes?.trim() || undefined });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Falha ao agendar.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={submit} noValidate aria-label="Formulário de agendamento" className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quase lá!</h2>
          <p className="mt-1 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
            📅 {format(new Date(slot.start), "EEEE, dd 'de' MMMM", { locale: ptBR })} às{' '}
            <strong>{fmtTime(new Date(slot.start))}</strong> — {meetingType.name} ({meetingType.duration} min)
          </p>
        </div>

        <Input
          label="Seu nome *"
          placeholder="Maria Silva"
          autoComplete="name"
          required
          value={form.guestName}
          error={errors.guestName}
          onChange={(e) => setForm({ ...form, guestName: e.target.value })}
        />
        <Input
          label="Seu email *"
          type="email"
          placeholder="maria@empresa.com"
          autoComplete="email"
          required
          value={form.guestEmail}
          error={errors.guestEmail}
          onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
        />
        <Input
          label="Assunto *"
          placeholder="Entrevista para vaga de Frontend"
          required
          value={form.subject}
          error={errors.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <Textarea
          label="Mensagem (opcional)"
          placeholder="Algo que o host deva saber antes da reunião…"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <p className="text-xs text-slate-400">
          A confirmação será enviada para você e para {hostEmail}.
        </p>

        {submitError && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            {submitError}
          </p>
        )}

        <div className="flex justify-between gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            ← Voltar
          </Button>
          <Button type="submit" loading={submitting} size="lg">
            Confirmar agendamento
          </Button>
        </div>
      </form>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-8" aria-busy="true">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
