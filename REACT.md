# ⚛️ REACT DOCS (FRONTEND)

Arquitetura focada em **Feature Slices** e **Injeção de Dependência (DI)**. Sem código espaguete, sem lixo global.

## 📂 ESTRUTURA
```
src/
├── assets/         - Imagens/fontes/ícones.
├── components/     - UI burra (Botões, Inputs, Modais, Cards).
├── core/           - DI Container, tipos globais, configs.
├── features/       - 🌟 O coração. Tudo de um domínio mora junto.
│   ├── scheduling/   - Feature de agendamento (página pública)
│   ├── admin/        - Feature do painel admin
│   ├── auth/         - Feature de autenticação
│   └── calendar/     - Feature do calendário/datepicker
├── hooks/          - Hooks globais reutilizáveis.
├── providers/      - React Contexts SÓ pra injetar o DI.
├── store/          - Zustand stores.
├── lib/            - Integrações externas (Google API, Email).
└── utils/          - Helpers puros (datas, formatação, etc).
```

## 🧠 REGRAS
1. **Sem pasta global de types.** A interface fica JUNTO da implementação na `feature`.
2. **Componentes não instanciam serviços.** Use o hook de DI ou Zustand.
3. **Tailwind CSS** é o padrão para estilização. Sem CSS modules, sem styled-components.
4. **Responsivo first.** Mobile-first sempre.
5. **Acessibilidade.** Labels, aria-*, foco visível.
6. **Loading states.** Todo fetch tem skeleton ou spinner.
7. **Error boundaries.** Toda feature tem tratamento de erro.

## 💻 EXEMPLO: INJEÇÃO DE DEPENDÊNCIA
```tsx
// src/core/di.ts
export const container = {
  schedulingService: new SchedulingService(),
  calendarService: new CalendarService(),
};

// src/providers/DependencyProvider.tsx
export const DiContext = createContext(container);
export const DependencyProvider = ({ children }) => (
  <DiContext.Provider value={container}>{children}</DiContext.Provider>
);

// src/hooks/useDi.ts
export const useDi = <T,>(key: keyof typeof container): T => {
  return useContext(DiContext)[key] as T;
};

// Uso na UI:
const schedulingService = useDi<ISchedulingService>('schedulingService');
```

## 🎨 DESIGN SYSTEM (Tailwind)
- **Cores primárias:** Azul/Indigo (profissional, confiança)
- **Border radius:** rounded-lg / rounded-xl
- **Shadows:** shadow-sm, shadow-md
- **Spacing:** consistente com tailwind defaults
- **Tipografia:** Inter ou system font stack
- **Dark mode:** Suporte via `dark:` classes
