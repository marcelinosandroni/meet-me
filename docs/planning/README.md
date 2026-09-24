# 📅 MeetMe — Planejamento do Produto

> Artefato visual de refinamento e planejamento do produto MeetMe.
> **Não faz parte do app real** — é apenas documentação interativa.

## 🚀 Como Rodar

```bash
# Rodar em dev (hot reload)
npm run docs

# Build de produção
npm run docs:build

# Preview do build
npm run docs:preview
```

Acesse: `http://localhost:5173`

## 📂 O que tem aqui

Uma aplicação React/Vite/Tailwind independente que mostra:

- **📋 Visão Geral** — O que é o MeetMe, casos de uso, fluxo de agendamento
- **✨ Recursos** — Todos os 18 recursos planejados, filtráveis por categoria
- **🗺️ Roadmap** — 5 fases de desenvolvimento com 22 tasks detalhadas
- **🛠️ Stack** — Tecnologias escolhidas e estrutura de arquivos

## 🔗 Relação com o App Real

```
meetme/
├── docs/planning/    ← VOCÊ ESTÁ AQUI (planejamento visual)
├── src/              ← App real de agendamento (a ser implementado)
├── specs/            ← Specs SDD (PLAN.md, ROADMAP.md, tasks/)
├── AGENTS.md         ← Regras do agente IA
├── APP.md            ← Descrição do produto
└── REACT.md          ← Regras de arquitetura
```

## ⚡ Comandos Disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Roda o app REAL (src/) |
| `npm run docs` | Roda o planning (docs/planning/) |
| `npm run build` | Build do app real |
| `npm run docs:build` | Build do planning |
