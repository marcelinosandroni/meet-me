import { useEffect, useState } from 'react';
import { format, startOfMonth, subMonths, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Slot } from '../../core/types';
import { fmtTime, sameDay } from '../../utils/date';
import { Skeleton } from '../../components/Card';

interface Props {
  month: Date;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  slots: Slot[] | null; // null = carregando
  selectedSlot: Slot | null;
  onSelectSlot: (s: Slot) => void;
  isBlocked: (d: Date) => boolean;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function BookingCalendar({
  month,
  selectedDate,
  onSelectDate,
  slots,
  selectedSlot,
  onSelectSlot,
  isBlocked,
}: Props) {
  const [cursor, setCursor] = useState(startOfMonth(month));

  useEffect(() => setCursor(startOfMonth(month)), [month]);

  const firstWeekday = cursor.getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const today = new Date();
  const cells: Array<Date | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];

  const canGoBack = cursor > startOfMonth(subMonths(today, 0));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      {/* Grade de dias */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold capitalize text-slate-900 dark:text-white">
            {format(cursor, 'MMMM yyyy', { locale: ptBR })}
          </h3>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Mês anterior"
              disabled={!canGoBack}
              onClick={() => setCursor((c) => startOfMonth(subMonths(c, 1)))}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Próximo mês"
              onClick={() => setCursor((c) => startOfMonth(addMonths(c, 1)))}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div role="grid" aria-label="Calendário de disponibilidade" className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <div key={w} aria-hidden="true" className="py-1 text-xs font-medium text-slate-400">
              {w}
            </div>
          ))}
          {cells.map((day, idx) =>
            day === null ? (
              <div key={`empty-${idx}`} />
            ) : (
              <DayCell
                key={day.toISOString()}
                day={day}
                selected={selectedDate ? sameDay(day, selectedDate) : false}
                disabled={day < startOfDayLocal(today) || isBlocked(day)}
                onClick={() => onSelectDate(day)}
              />
            ),
          )}
        </div>
      </div>

      {/* Slots do dia selecionado */}
      <div aria-live="polite">
        {!selectedDate ? (
          <p className="pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            👈 Selecione um dia para ver os horários.
          </p>
        ) : slots === null ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : slots.length === 0 || slots.every((s) => !s.available) ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            Nenhum horário disponível neste dia.
            <br />
            Tente outra data.
          </div>
        ) : (
          <ul className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.start === slot.start;
              return (
                <li key={slot.start}>
                  <button
                    type="button"
                    disabled={!slot.available}
                    aria-pressed={isSelected}
                    onClick={() => onSelectSlot(slot)}
                    className={`w-full rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                        : slot.available
                          ? 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500'
                          : 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300 line-through dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-600'
                    }`}
                  >
                    {fmtTime(new Date(slot.start))}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function startOfDayLocal(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function DayCell({
  day,
  selected,
  disabled,
  onClick,
}: {
  day: Date;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const isToday = sameDay(day, new Date());
  return (
    <button
      type="button"
      role="gridcell"
      aria-selected={selected}
      aria-label={format(day, "EEEE, dd 'de' MMMM", { locale: ptBR })}
      disabled={disabled}
      onClick={onClick}
      className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        selected
          ? 'bg-indigo-600 text-white shadow-md'
          : disabled
            ? 'cursor-not-allowed text-slate-300 dark:text-slate-600'
            : isToday
              ? 'border border-indigo-400 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40'
              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
      }`}
    >
      {day.getDate()}
    </button>
  );
}
