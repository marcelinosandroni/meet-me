# 🎯 PLAN (O Cérebro do Projeto)

> 🛑 **REGRA FIXA (Agente IA, LEIA ISSO ANTES DE CODAR):** 
> O desenvolvedor (Marcelino) tem TDAH. As tarefas AQUI devem ser **microscópicas**. 
> Se uma tarefa levar mais de 1 hora pra fazer, QUEBRE ELA EM DUAS. 
> Nunca pule um passo. Nunca comece o Passo 2 sem testar e commitar o Passo 1.
> Atualize os status rigorosamente no final de cada prompt: `[ ]` (To Do), `[-]` (In Progress), `[x]` (Done).

---

## 📊 Status Geral
- **Fase Atual:** 4 (Integrações — pendente de credenciais Google/Email)
- **Progresso:** 16/23 tasks concluídas · Próxima tarefa pendente: TASK-4.1

---

## Fase 1: Setup & Base UI (Fundação) ✅ CONCLUÍDA E ARQUIVADA
> Ver resumo em specs/history/phases/phase-1-finished.md

## Fase 2: Página Pública de Agendamento (Core) ✅ CONCLUÍDA E ARQUIVADA
> Ver resumo em specs/history/phases/phase-2-finished.md

## Fase 3: Painel Admin (Configuração do Host) ✅ CONCLUÍDA E ARQUIVADA
> Ver resumo em specs/history/phases/phase-3-finished.md

## Fase 4: Integrações (Google Calendar + Email)
> Objetivo: Conectar com Google Calendar e enviar emails de confirmação.

- [x] - [TASK-4.1: Google OAuth2 Flow (login do host)](./specs/tasks/PHASE-4/TASK-4.1.md)
- [x] - [TASK-4.2: Integração Google Calendar API (ler disponibilidade)](./specs/tasks/PHASE-4/TASK-4.2.md)
- [x] - [TASK-4.3: Criar eventos no Google Calendar ao agendar](./specs/tasks/PHASE-4/TASK-4.3.md)
- [x] - [TASK-4.4: Envio de Emails de Confirmação](./specs/tasks/PHASE-4/TASK-4.4.md)

## Fase 5: Polimento & Deploy ✅ CONCLUÍDA E ARQUIVADA
> Objetivo: Deixar bonito, responsivo, e pronto para produção.
> Deploy alvo: **Vercel** (SPA + serverless functions em `/api`). Sem Cloudflare.
> Ver `README.md` → seção "Deploy na Vercel" e `.env.example` para credenciais.

- [x] - [TASK-5.1: Responsividade Mobile](./specs/tasks/PHASE-5/TASK-5.1.md)
- [x] - [TASK-5.2: Animações e Transições](./specs/tasks/PHASE-5/TASK-5.2.md)
- [x] - [TASK-5.3: SEO + Meta Tags (Open Graph)](./specs/tasks/PHASE-5/TASK-5.3.md)
- [x] - [TASK-5.4: Deploy na Vercel](./specs/tasks/PHASE-5/TASK-5.4.md)
