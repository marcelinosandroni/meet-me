/**
 * 📅 MeetMe — App principal com rotas (Fases 1–3 concluídas)
 * Rotas: / (landing), /schedule/:hostId (página pública), /admin (painel do host)
 */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DependencyProvider } from './providers/DependencyProvider';
import { Footer, Header } from './components/Layout';
import { LandingPage } from './LandingPage';
import { PublicSchedulePage } from './features/scheduling/PublicSchedulePage';
import { AdminPage } from './features/admin/AdminPage';
import { ErrorBoundary } from './features/scheduling/ErrorBoundary';

export default function App() {
  return (
    <DependencyProvider>
      <HashRouter>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100">
          <Header />
          <div className="flex-1">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/schedule/:hostId" element={<PublicSchedulePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </HashRouter>
    </DependencyProvider>
  );
}
