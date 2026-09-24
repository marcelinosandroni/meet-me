# 📅 MeetMe - Sistema de Agendamento de Reuniões

> App de agendamento de reuniões estilo Calendly, onde o dono da conta configura seus horários disponíveis, tipos de reunião, e compartilha um link público para recrutadores e profissionais agendarem reuniões automaticamente.

## 🏗️ Arquitetura e Regras
Este repositório segue padrões estritos de Spec-Driven Development (SDD). Agentes de IA e devs, LEIAM as regras abaixo antes de tocar em uma linha de código:

- [🤖 Regras do Agente IA -> AGENTS.md](./AGENTS.md)
- [💅 Regras do Frontend (React/Vite) -> REACT.md](./REACT.md)
- [🗺️ Visão Global -> ARCHITECTURE.md](./ARCHITECTURE.md)

## 🛠️ Stack Principal
- **Client (UI):** React, Vite, Tailwind CSS, Zustand
- **Integrações:** Google Calendar API, Nodemailer/SendGrid
- **Infra:** Vercel (frontend) + Serverless Functions ou Supabase
- **DB:** Supabase (PostgreSQL) ou Firebase

---

## 📝 Detalhes Específicos do App

### Integrações de Terceiros
- **Google Calendar API**: Sync bidirecional de eventos (ler disponibilidade + criar eventos)
- **Google OAuth2**: Login do admin e permissão de acesso ao calendário
- **Email Service** (Resend/SendGrid): Confirmações e lembretes automáticos
- **Calendly-like Link**: URL pública customizável por usuário

### Features Principais
- **Painel Admin (Host)**: Onde o dono configura tudo
  - Configurar tipos de reunião (30min, 1h, 1h30, custom)
  - Definir horários disponíveis por dia da semana
  - Bloquear datas específicas (férias, compromissos)
  - Personalizar perfil público (foto, bio, cor tema)
  - Conectar Google Calendar
  - Configurar email de notificação

- **Página Pública (Guest)**: Link compartilhável
  - Selecionar tipo de reunião
  - Ver calendário com slots disponíveis
  - Selecionar data e horário
  - Preencher dados (nome, email, assunto)
  - Confirmar agendamento
  - Receber confirmação por email

- **Integração Google Calendar**
  - Ao agendar: cria evento automaticamente no Google Calendar do host
  - Ao verificar disponibilidade: lê eventos existentes para não mostrar conflitos
  - Timezone-aware: detecta timezone do visitante e converte

### Regras Críticas de Negócio
- O host só pode receber agendamentos nos horários que ele definiu como disponíveis
- Slots já agendados não podem ser agendados novamente (double-booking prevention)
- O Google Calendar é a fonte da verdade para disponibilidade (se integrado)
- Confirmação por email é enviada tanto para o host quanto para o guest
- O link público é único por host (ex: `/schedule/marcelino`)
- Buffer time entre reuniões é configurável (ex: 15min entre cada)

### Tipos de Reunião (Configuráveis)
- Reunião rápida (15 min)
- Reunião padrão (30 min)
- Reunião longa (60 min)
- Entrevista (45 min)
- Custom (duração definida pelo host)

### Configurações do Host
- Nome de exibição
- Foto de perfil
- Bio/descrição
- Email de contato
- Timezone padrão
- Cor tema da página pública
- Google Calendar ID (para integração)
- Horários disponíveis (por dia da semana)
- Buffer entre reuniões
- Limite de agendamentos por dia
- Perguntas customizadas para o guest
