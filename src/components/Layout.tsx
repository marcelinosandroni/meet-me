import { Link, NavLink } from 'react-router-dom';
import { CalendarDays, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <CalendarDays size={18} aria-hidden="true" />
          </span>
          MeetMe
        </Link>
        <nav aria-label="Navegação principal" className="flex items-center gap-1">
          <NavLink
            to="/schedule/marcelino"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            Agendar
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <LayoutDashboard size={15} aria-hidden="true" />
            Admin
          </NavLink>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="ml-2 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-700">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>
          📅 <strong className="font-medium text-slate-700 dark:text-slate-300">MeetMe</strong> — agendamento de
          reuniões estilo Calendly.{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
          >
            Open source
          </a>
        </p>
      </div>
    </footer>
  );
}
