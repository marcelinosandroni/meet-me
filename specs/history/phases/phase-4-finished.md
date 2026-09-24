# Fase 4 — Integrações (Google Calendar + Email) ✅

## O que foi feito
- Serverless functions na **Vercel** (`api/*.ts`, runtime Node via `@vercel/node`):
  - `api/auth/google.ts` — TASK-4.1: gera URL de consentimento OAuth2 do Google (escopos `calendar.events` + `userinfo.email`).
  - `api/auth/callback.ts` — TASK-4.1: troca o `code` por access/refresh token (`exchangeCode` em `api/_lib/google.ts`).
  - `api/calendar/freebusy.ts` — TASK-4.2: consulta Free/Busy do calendário do host para ocultar slots ocupados.
  - `api/bookings/create.ts` — TASK-4.3/4.4: cria evento no Google Calendar (com Google Meet) e envia email de confirmação via Resend.
- Helpers: `api/_lib/google.ts` (OAuth, refresh, criação de evento) e `api/_lib/email.ts` (Resend).
- Frontend: `RealApiSchedulingService` em `src/lib/schedulingService.ts`, alternado por `VITE_API_MODE=demo|real` via DI (`src/core/di.ts`).
- **Modo demo/mocks**: sem credenciais, todas as rotas respondem simuladas (`demo: true`) e emails viram log no console — fluxo completo testável localmente com `npm run dev` + `npm run dev:api` (mock em `api/dev-server.mjs`, proxy `/api` no `vite.config.js`).

## Validação
- `npm run typecheck` e `npm run build` 100% verdes.

## Pendências operacionais (não-código)
- Preencher credenciais reais (ver `.env.example` / README) antes de usar `VITE_API_MODE=real`.
