# 🗺️ ROADMAP (A Visão Macro)

> 🛑 **REGRA FIXA (Agente IA, LEIA ISSO):** 
> 1. Aqui entram apenas MARCOS GERAIS (Milestones). NADA de tarefas técnicas (ex: "criar hook").
> 2. **PROIBIDO EDITAR ACIMA DO TRAÇO.** Você SÓ tem permissão para atualizar os status ou adicionar fases ABAIXO da linha `---`.

---

## Fase 1: MVP Funcional (Sem Backend Real)
- [ ] Página pública de agendamento funcionando com dados mock
- [ ] Calendário interativo com seleção de slots
- [ ] Painel admin para configurar horários e tipos de reunião
- [ ] Formulário de agendamento com validação
- [ ] Tela de confirmação pós-agendamento
- [ ] Link público compartilhável (ex: `/schedule/marcelino`)

## Fase 2: Integração Google Calendar
- [ ] OAuth2 com Google (login do host)
- [ ] Leitura de disponibilidade do Google Calendar
- [ ] Criação automática de eventos ao agendar
- [ ] Sync bidirecional (bloqueia slots já ocupados)

## Fase 3: Sistema de Notificações
- [ ] Email de confirmação para o host
- [ ] Email de confirmação para o guest
- [ ] Lembrete 24h antes (opcional)
- [ ] Email de cancelamento

## Fase 4: Features Avançadas
- [ ] Múltiplos tipos de reunião com preços (futuro: Stripe)
- [ ] Perguntas customizadas para o guest
- [ ] Buffer time configurável entre reuniões
- [ ] Bloqueio de datas específicas (férias)
- [ ] Timezone detection automática
- [ ] Dashboard de agendamentos (lista, cancela, reagenda)

## Fase 5: Escala & Monetização
- [ ] Múltiplos hosts (SaaS)
- [ ] Plano gratuito vs pago
- [ ] Custom domain para hosts premium
- [ ] White-label (remover branding)
- [ ] Analytics de agendamentos
- [ ] Integração com Zoom/Meet (link automático)
