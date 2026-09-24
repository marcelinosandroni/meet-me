import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck2, Globe2, Mail, Settings2 } from 'lucide-react';
import { Card } from './components/Card';
import { Button } from './components/Button';

const FEATURES = [
  { icon: CalendarCheck2, title: 'Página pública', text: 'Compartilhe um link único e deixe que recrutadores agendem sozinhos.' },
  { icon: Settings2, title: 'Painel admin', text: 'Configure tipos de reunião, horários, buffer e limites por dia.' },
  { icon: Globe2, title: 'Timezone-aware', text: 'Slots calculados no fuso do host e exibidos em horário local.' },
  { icon: Mail, title: 'Confirmação por email', text: 'Host e guest recebem confirmação automática do agendamento.' },
];

export function LandingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
          ✨ Estilo Calendly, feito para devs
        </p>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Agende reuniões sem{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            ir e vir de email
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          MeetMe é o seu link público de agendamento. Você define quando pode, o outro lado escolhe a hora.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/schedule/marcelino" className="contents">
            <Button size="lg">
              Ver página pública demo <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
          <Link to="/admin" className="contents">
            <Button size="lg" variant="secondary">
              Abrir painel admin
            </Button>
          </Link>
        </div>
      </section>

      <section aria-label="Recursos" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{text}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
