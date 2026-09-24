# MeetMe 🔗

Sistema de agendamento de reuniões (estilo Calendly) — React + Vite + Tailwind v4, com backend serverless na **Vercel** (Google Calendar + Resend).

## Rodando localmente

```bash
npm install
npm run dev          # frontend em http://localhost:3000 (MODO DEMO por padrão)
npm run dev:api      # opcional: mock das rotas /api em http://localhost:8787
```

- **Modo demo (padrão)**: sem nenhuma credencial, o app usa `MockSchedulingService` + localStorage e as rotas `/api/*` respondem simulações (`demo: true`). Todo o fluxo (escolher reunião → slot → form → confirmação) é testável offline.
- **Modo real**: copie `.env.example` para `.env.local`, preencha as credenciais e defina `VITE_API_MODE=real`. Em dev, rode também `npm run dev:api` (proxy do Vite encaminha `/api` → `localhost:8787`).

Validação: `npm run typecheck` e `npm run build`.

## Deploy na Vercel

1. Suba o repositório no GitHub e importe em [vercel.com/new](https://vercel.com/new) — o `vercel.json` já configura framework Vite, `dist/` e as funções `api/**/*.ts`.
2. Em **Project → Settings → Environment Variables**, adicione as variáveis de `.env.example`:
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`
   - `RESEND_API_KEY`, `EMAIL_FROM`
   - `VITE_API_MODE=real` (use `demo` se quiser publicar sem integrações)
3. Deploy. Rotas SPA (`/schedule/:hostId`, `/admin`) já têm rewrite configurado.

## Credenciais externas necessárias (detalhes em `.env.example`)

| Variável | Onde obter | Para quê |
|---|---|---|
| `GOOGLE_CLIENT_ID` / `SECRET` | Google Cloud Console → APIs & Services → Credentials (criar projeto, ativar **Google Calendar API**, OAuth consent screen, OAuth client "Web application") | Login do host + criação de eventos |
| `GOOGLE_REDIRECT_URI` | Mesmo lugar: Authorized redirect URIs → `https://SEU-DOMINIO.vercel.app/api/auth/callback` | Callback OAuth |
| `GOOGLE_ACCESS_TOKEN` | Gerado via `/api/auth/google` → callback (MVP simplificado) | Autenticar chamadas ao Calendar |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys | Emails de confirmação |
| `EMAIL_FROM` | Domínio verificado no Resend (ou `onboarding@resend.dev` p/ testes) | Remetente |

## Estrutura

- `src/` — SPA React (arquitetura em `REACT.md`: DI em `src/core/di.ts`, serviços em `src/lib/schedulingService.ts`)
- `api/` — serverless functions da Vercel (OAuth, free/busy, criação de booking + email)
- `specs/` — SDD: PLAN, ROADMAP, BACKLOG e histórico de fases
