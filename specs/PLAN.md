# 🎯 PLAN (O Cérebro do Projeto)

> 🛑 **REGRA FIXA (Agente IA, LEIA ISSO ANTES DE CODAR):** 
> O desenvolvedor (Marcelino) tem TDAH. As tarefas AQUI devem ser **microscópicas**. 
> Se uma tarefa levar mais de 1 hora pra fazer, QUEBRE ELA EM DUAS. 
> Nunca pule um passo. Nunca comece o Passo 2 sem testar e commitar o Passo 1.
> Atualize os status rigorosamente no final de cada prompt: `[ ]` (To Do), `[-]` (In Progress), `[x]` (Done).

---

## 📊 Status Geral
- **Fase Atual:** 1 (Setup & Base UI)
- **Progresso:** 0/18 tasks

---

## Fase 1: Setup & Base UI (Fundação)
> Objetivo: Estrutura do projeto, design system base, e navegação funcionando.

- [ ] - [TASK-1.1: Setup Tailwind + Design Tokens](./specs/tasks/PHASE-1/TASK-1.1.md)
- [ ] - [TASK-1.2: Layout Base (Header + Footer)](./specs/tasks/PHASE-1/TASK-1.2.md)
- [ ] - [TASK-1.3: Componentes UI Base (Button, Input, Card)](./specs/tasks/PHASE-1/TASK-1.3.md)
- [ ] - [TASK-1.4: Router Setup (React Router)](./specs/tasks/PHASE-1/TASK-1.4.md)
- [ ] - [TASK-1.5: Zustand Store Base (config do host)](./specs/tasks/PHASE-1/TASK-1.5.md)

## Fase 2: Página Pública de Agendamento (Core)
> Objetivo: O link público onde recrutadores/guests agendam reuniões.

- [ ] - [TASK-2.1: Página de Seleção de Tipo de Reunião](./specs/tasks/PHASE-2/TASK-2.1.md)
- [ ] - [TASK-2.2: Componente Calendário Interativo](./specs/tasks/PHASE-2/TASK-2.2.md)
- [ ] - [TASK-2.3: Seleção de Horários (Slots)](./specs/tasks/PHASE-2/TASK-2.3.md)
- [ ] - [TASK-2.4: Formulário de Dados do Guest](./specs/tasks/PHASE-2/TASK-2.4.md)
- [ ] - [TASK-2.5: Tela de Confirmação](./specs/tasks/PHASE-2/TASK-2.5.md)
- [ ] - [TASK-2.6: Lógica de Disponibilidade (slots por config)](./specs/tasks/PHASE-2/TASK-2.6.md)

## Fase 3: Painel Admin (Configuração do Host)
> Objetivo: Onde o dono configura tudo (perfil, horários, tipos de reunião).

- [ ] - [TASK-3.1: Página de Perfil do Host (nome, foto, bio)](./specs/tasks/PHASE-3/TASK-3.1.md)
- [ ] - [TASK-3.2: CRUD de Tipos de Reunião](./specs/tasks/PHASE-3/TASK-3.2.md)
- [ ] - [TASK-3.3: Configuração de Horários Disponíveis](./specs/tasks/PHASE-3/TASK-3.3.md)
- [ ] - [TASK-3.4: Configuração de Aparência (tema, cor)](./specs/tasks/PHASE-3/TASK-3.4.md)
- [ ] - [TASK-3.5: Preview da Página Pública](./specs/tasks/PHASE-3/TASK-3.5.md)

## Fase 4: Integrações (Google Calendar + Email)
> Objetivo: Conectar com Google Calendar e enviar emails de confirmação.

- [ ] - [TASK-4.1: Google OAuth2 Flow (login do host)](./specs/tasks/PHASE-4/TASK-4.1.md)
- [ ] - [TASK-4.2: Integração Google Calendar API (ler disponibilidade)](./specs/tasks/PHASE-4/TASK-4.2.md)
- [ ] - [TASK-4.3: Criar eventos no Google Calendar ao agendar](./specs/tasks/PHASE-4/TASK-4.3.md)
- [ ] - [TASK-4.4: Envio de Emails de Confirmação](./specs/tasks/PHASE-4/TASK-4.4.md)

## Fase 5: Polimento & Deploy
> Objetivo: Deixar bonito, responsivo, e pronto para produção.

- [ ] - [TASK-5.1: Responsividade Mobile](./specs/tasks/PHASE-5/TASK-5.1.md)
- [ ] - [TASK-5.2: Animações e Transições](./specs/tasks/PHASE-5/TASK-5.2.md)
- [ ] - [TASK-5.3: SEO + Meta Tags (Open Graph)](./specs/tasks/PHASE-5/TASK-5.3.md)
- [ ] - [TASK-5.4: Deploy na Vercel](./specs/tasks/PHASE-5/TASK-5.4.md)
