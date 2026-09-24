# 🏗️ ARQUITETURA GLOBAL

## 📂 ESTRUTURA DO PROJETO
```text
meetme/
├── src/
│   ├── App.tsx           - Entry point com rotas
│   ├── main.tsx          - Bootstrap React
│   ├── index.css         - Tailwind base
│   ├── components/       - UI components reutilizáveis
│   ├── features/         - Features por domínio
│   │   ├── scheduling/   - Página pública de agendamento
│   │   ├── admin/        - Painel de configuração do host
│   │   ├── auth/         - Login/registro
│   │   └── calendar/     - Componentes de calendário
│   ├── core/             - DI, configs, tipos
│   ├── hooks/            - Hooks globais
│   ├── store/            - Zustand stores
│   ├── lib/              - Integrações (Google, Email)
│   └── utils/            - Helpers puros
├── specs/                - Documentação SDD
│   ├── PLAN.md           - Plano atual
│   ├── ROADMAP.md        - Visão macro
│   ├── BACKLOG.md        - Ideias futuras
│   └── tasks/            - Tarefas por fase
├── docs/                 - Documentação do produto
├── AGENTS.md             - Regras do agente IA
├── APP.md                - Descrição do app
├── REACT.md              - Regras do frontend
└── ARCHITECTURE.md       - Este arquivo
```

## 🔄 FLUXO DE DADOS

### Fluxo de Agendamento (Guest)
1. Guest acessa link público (`/schedule/:hostId`)
2. Frontend busca config do host (tipos de reunião, horários)
3. Guest seleciona tipo de reunião
4. Frontend mostra calendário com slots disponíveis
5. Se Google Calendar integrado: verifica disponibilidade real
6. Guest seleciona data/horário
7. Guest preenche dados (nome, email, mensagem)
8. Frontend envia para API → cria evento no Google Calendar + envia emails
9. Guest vê confirmação

### Fluxo de Configuração (Host/Admin)
1. Host faz login (Google OAuth)
2. Host acessa painel admin
3. Host configura: perfil, tipos de reunião, horários, integração Google Calendar
4. Configs são salvas no DB (Supabase)
5. Host compartilha link público

## 🔌 INTEGRAÇÕES

### Google Calendar API
- **OAuth2 Flow**: Host autoriza acesso ao calendário
- **FreeBusy API**: Verifica slots ocupados
- **Events.insert**: Cria novos eventos ao agendar
- **Events.list**: Lista eventos para calcular disponibilidade
- **Timezone**: Sempre converte para timezone do visitante

### Email (Resend/SendGrid)
- **Confirmação para Host**: "Novo agendamento recebido"
- **Confirmação para Guest**: "Sua reunião foi confirmada"
- **Lembrete**: 24h antes da reunião (futuro)
- **Cancelamento**: Notificação de cancelamento

## 🛡️ SEGURANÇA
- Links públicos são apenas leitura (não expõem dados sensíveis)
- Admin panel protegido por autenticação
- API keys do Google no backend apenas (nunca no frontend)
- Rate limiting para prevenir spam de agendamentos
