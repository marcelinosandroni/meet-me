import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarX2, Check, ExternalLink, Link2, RotateCcw, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Booking, MeetingType, ThemeColor, Weekday } from '../../core/types';
import type { ISchedulingService } from '../../lib/schedulingService';
import { useDi } from '../../hooks/useDi';
import { useConfigStore } from '../../store/configStore';
import { fmtTime } from '../../utils/date';
import { Badge, Card, Skeleton, themeAccent } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const TABS = ['Perfil', 'Reuniões', 'Horários', 'Aparência', 'Agendamentos'] as const;
type Tab = (typeof TABS)[number];

const DAY_LABELS: Array<{ weekday: Weekday; label: string }> = [
  { weekday: 1, label: 'Segunda' },
  { weekday: 2, label: 'Terça' },
  { weekday: 3, label: 'Quarta' },
  { weekday: 4, label: 'Quinta' },
  { weekday: 5, label: 'Sexta' },
  { weekday: 6, label: 'Sábado' },
  { weekday: 0, label: 'Domingo' },
];

export function AdminPage() {
  const config = useConfigStore((s) => s.config);
  const [tab, setTab] = useState<Tab>('Perfil');
  const publicUrl = `/schedule/${config.profile.username}`;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row">
      {/* Sidebar */}
      <aside className="shrink-0 md:w-56">
        <nav aria-label="Seções do painel" className="flex gap-1 overflow-x-auto md:flex-col">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              aria-current={tab === t ? 'page' : undefined}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <Card className="mt-6 hidden p-4 md:block">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Seu link público</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="truncate text-sm text-indigo-600 dark:text-indigo-400">meetme.dev{publicUrl}</code>
            <CopyButton text={`${window.location.origin}${publicUrl}`} />
          </div>
          <Link to={publicUrl} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400">
            <ExternalLink size={12} aria-hidden="true" /> Abrir preview
          </Link>
        </Card>
      </aside>

      {/* Conteúdo */}
      <section className="min-w-0 flex-1 space-y-6" aria-live="polite">
        {tab === 'Perfil' && <ProfileTab />}
        {tab === 'Reuniões' && <MeetingTypesTab />}
        {tab === 'Horários' && <ScheduleTab />}
        {tab === 'Aparência' && <AppearanceTab />}
        {tab === 'Agendamentos' && <BookingsTab />}
      </section>
    </main>
  );
}

/* ---------- Perfil ---------- */
function ProfileTab() {
  const profile = useConfigStore((s) => s.config.profile);
  const updateProfile = useConfigStore((s) => s.updateProfile);
  const [saved, setSaved] = useState(false);

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Perfil do Host</h2>
      <Input label="Nome de exibição" value={profile.displayName} onChange={(e) => { updateProfile({ displayName: e.target.value }); flash(setSaved); }} />
      <Input
        label="Slug do link público"
        value={profile.username}
        onChange={(e) => { updateProfile({ username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }); flash(setSaved); }}
      />
      <Input label="Email de contato" type="email" value={profile.email} onChange={(e) => { updateProfile({ email: e.target.value }); flash(setSaved); }} />
      <label className="block space-y-1">
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bio</span>
        <textarea
          value={profile.bio}
          rows={3}
          onChange={(e) => { updateProfile({ bio: e.target.value }); flash(setSaved); }}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
      </label>
      <SaveIndicator saved={saved} />
    </Card>
  );
}

/* ---------- Tipos de Reunião (CRUD) ---------- */
function MeetingTypesTab() {
  const meetingTypes = useConfigStore((s) => s.config.meetingTypes);
  const upsert = useConfigStore((s) => s.upsertMeetingType);
  const remove = useConfigStore((s) => s.removeMeetingType);
  const [editing, setEditing] = useState<MeetingType | null>(null);

  const blank = (): MeetingType => ({
    id: `mt-${Date.now()}`,
    name: '',
    description: '',
    duration: 30,
    location: 'Google Meet',
    color: 'indigo',
    active: true,
  });

  return (
    <>
      <ul className="space-y-3">
        {meetingTypes.map((mt) => (
          <li key={mt.id}>
            <Card className="flex items-center justify-between gap-4 p-4">
              <span className="flex min-w-0 items-center gap-3">
                <span className={`h-9 w-1.5 shrink-0 rounded-full ${themeAccent[mt.color].dot}`} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-slate-900 dark:text-white">{mt.name}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {mt.duration} min · {mt.location}
                  </span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                {!mt.active && <Badge tone="warning">inativa</Badge>}
                <Button variant="ghost" size="sm" onClick={() => setEditing(mt)} aria-label={`Editar ${mt.name}`}>
                  Editar
                </Button>
                <button
                  type="button"
                  aria-label={`Excluir ${mt.name}`}
                  onClick={() => remove(mt.id)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                >
                  <Trash2 size={16} />
                </button>
              </span>
            </Card>
          </li>
        ))}
      </ul>
      <Button variant="secondary" onClick={() => setEditing(blank())}>
        + Novo tipo de reunião
      </Button>

      {editing && (
        <MeetingTypeForm
          initial={editing}
          isNew={!meetingTypes.some((m) => m.id === editing.id)}
          onClose={() => setEditing(null)}
          onSave={(mt) => {
            upsert(mt);
            setEditing(null);
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
          }}
        />
      )}
    </>
  );
}

function MeetingTypeForm({
  initial,
  isNew,
  onClose,
  onSave,
}: {
  initial: MeetingType;
  isNew: boolean;
  onClose: () => void;
  onSave: (mt: MeetingType) => void;
}) {
  const [form, setForm] = useState<MeetingType>(initial);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-label="Editar tipo de reunião">
      <Card className="w-full max-w-md space-y-4 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{isNew ? 'Novo tipo de reunião' : 'Editar tipo'}</h3>
        <Input label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex.: Papo rápido" />
        <Input label="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="O que rola nessa reunião?" />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Duração (min)"
            type="number"
            min={5}
            step={5}
            value={String(form.duration)}
            onChange={(e) => setForm({ ...form, duration: Math.max(5, Number(e.target.value) || 0) })}
          />
          <label className="block space-y-1">
            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">Local</span>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option>Google Meet</option>
              <option>Zoom</option>
              <option>Telefone</option>
              <option>Presencial</option>
            </select>
          </label>
        </div>
        <fieldset>
          <legend className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Cor</legend>
          <div className="flex gap-2" role="radiogroup" aria-label="Cor do tipo de reunião">
            {(Object.keys(themeAccent) as ThemeColor[]).map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={form.color === c}
                aria-label={c}
                onClick={() => setForm({ ...form, color: c })}
                className={`h-8 w-8 rounded-full ${themeAccent[c].dot} transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  form.color === c ? 'scale-110 ring-2 ring-offset-2 ' + themeAccent[c].ring : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Ativo (visível na página pública)
        </label>
        {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button
            onClick={() => {
              if (form.name.trim().length < 2) return setError('Dê um nome para o tipo de reunião.');
              onSave(form);
            }}
          >
            Salvar
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Horários semanais ---------- */
function ScheduleTab() {
  const schedule = useConfigStore((s) => s.config.weeklySchedule);
  const bufferMinutes = useConfigStore((s) => s.config.bufferMinutes);
  const dailyLimit = useConfigStore((s) => s.config.dailyLimit);
  const setWeeklySchedule = useConfigStore((s) => s.setWeeklySchedule);
  const setBuffer = useConfigStore((s) => s.setBufferMinutes);
  const setLimit = useConfigStore((s) => s.setDailyLimit);

  const patchDay = (weekday: Weekday, patch: Partial<(typeof schedule)[number]>) => {
    setWeeklySchedule(schedule.map((d) => (d.weekday === weekday ? { ...d, ...patch } : d)));
  };

  return (
    <>
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Horários Disponíveis</h2>
        <ul className="space-y-2">
          {DAY_LABELS.map(({ weekday, label }) => {
            const day = schedule.find((s) => s.weekday === weekday)!;
            return (
              <li key={weekday} className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <label className="flex w-28 items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={day.enabled}
                    onChange={(e) => patchDay(weekday, { enabled: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {label}
                </label>
                {day.enabled && (
                  <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <TimeField value={day.startHour} onChange={(v) => patchDay(weekday, { startHour: v })} label={`Início ${label}`} />
                    →
                    <TimeField value={day.endHour} onChange={(v) => patchDay(weekday, { endHour: v })} label={`Fim ${label}`} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Buffer entre reuniões (min)"
          type="number"
          min={0}
          step={5}
          value={String(bufferMinutes)}
          onChange={(e) => setBuffer(Math.max(0, Number(e.target.value) || 0))}
        />
        <Input
          label="Limite de agendamentos por dia"
          type="number"
          min={1}
          value={String(dailyLimit)}
          onChange={(e) => setLimit(Math.max(1, Number(e.target.value) || 1))}
        />
      </Card>
    </>
  );
}

function TimeField({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <input
      type="time"
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
    />
  );
}

/* ---------- Aparência ---------- */
function AppearanceTab() {
  const themeColor = useConfigStore((s) => s.config.profile.themeColor);
  const updateProfile = useConfigStore((s) => s.updateProfile);
  const colors: ThemeColor[] = ['indigo', 'violet', 'blue', 'emerald', 'rose'];

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Aparência da Página Pública</h2>
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Cor tema</legend>
        <div className="flex gap-3" role="radiogroup" aria-label="Cor tema">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={themeColor === c}
              aria-label={c}
              onClick={() => updateProfile({ themeColor: c })}
              className={`h-10 w-10 rounded-full ${themeAccent[c].dot} transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                themeColor === c ? 'scale-110 ring-2 ring-offset-2 ' + themeAccent[c].ring : 'opacity-50 hover:opacity-90'
              }`}
            />
          ))}
        </div>
      </fieldset>
      <div className={`rounded-xl p-4 ${themeAccent[themeColor].bg}`}>
        <p className={`text-sm font-medium capitalize ${themeAccent[themeColor].text}`}>
          Preview: cor de destaque aplicada nos elementos da página pública.
        </p>
      </div>
    </Card>
  );
}

/* ---------- Agendamentos ---------- */
function BookingsTab() {
  const service = useDi<ISchedulingService>('schedulingService');
  const meetingTypes = useConfigStore((s) => s.config.meetingTypes);
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  const load = () => service.getBookings().then(setBookings);
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancel = async (id: string) => {
    await service.cancelBooking(id);
    load();
  };

  if (bookings === null) return <Skeleton className="h-40 w-full" />;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Agendamentos</h2>
        <Button variant="ghost" size="sm" onClick={load}>↻ Atualizar</Button>
      </div>
      {bookings.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
          <CalendarX2 size={32} className="mx-auto mb-2 opacity-40" aria-hidden="true" />
          Nenhum agendamento ainda. Compartilhe seu link!
          <div className="mt-4">
            <CopyButton text={`${window.location.origin}/schedule/marcelino`} />
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
          {bookings.map((b) => {
            const mt = meetingTypes.find((m) => m.id === b.meetingTypeId);
            const date = new Date(b.start);
            return (
              <li key={b.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900 dark:text-white">
                    {b.subject}{' '}
                    {b.status === 'cancelled' ? (
                      <Badge tone="danger">cancelado</Badge>
                    ) : (
                      <Badge tone="success">confirmado</Badge>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {format(date, "EEE, dd MMM", { locale: ptBR })} · {fmtTime(date)}–{fmtTime(new Date(b.end))} ·{' '}
                    {mt?.name ?? '—'} · {b.guestName} ({b.guestEmail})
                  </p>
                </div>
                {b.status === 'confirmed' && (
                  <Button variant="danger" size="sm" onClick={() => cancel(b.id)}>
                    Cancelar
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

/* ---------- helpers ---------- */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copiar link público"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-700"
    >
      {copied ? <Check size={14} className="text-emerald-500" aria-label="Copiado!" /> : <Link2 size={14} />}
    </button>
  );
}

let flashTimer: ReturnType<typeof setTimeout>;
function flash(setter: (v: boolean) => void) {
  setter(true);
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => setter(false), 1200);
}

function SaveIndicator({ saved }: { saved: boolean }) {
  return (
    <p aria-live="polite" className={`text-xs text-emerald-600 transition-opacity dark:text-emerald-400 ${saved ? 'opacity-100' : 'opacity-0'}`}>
      ✓ Salvo automaticamente
    </p>
  );
}

export function ResetButton() {
  const reset = useConfigStore((s) => s.resetToMock);
  return (
    <Button variant="ghost" size="sm" onClick={reset}>
      <RotateCcw size={14} aria-hidden="true" /> Restaurar padrões
    </Button>
  );
}
