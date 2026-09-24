import { useState } from 'react'

// Types
type Phase = {
  id: number
  title: string
  description: string
  status: 'planned' | 'in-progress' | 'done'
  tasks: string[]
  icon: string
}

type Feature = {
  id: string
  title: string
  description: string
  icon: string
  category: 'core' | 'integration' | 'admin' | 'future'
  priority: 'high' | 'medium' | 'low'
}

// Data
const phases: Phase[] = [
  {
    id: 1,
    title: 'Setup & Base UI',
    description: 'Fundação do projeto: estrutura, design system, componentes base e navegação.',
    status: 'planned',
    icon: '🏗️',
    tasks: [
      'Setup Tailwind + Design Tokens (cores, tipografia, espaçamentos)',
      'Layout Base com Header e Footer responsivos',
      'Componentes UI Base: Button, Input, Card, Badge, Modal',
      'Router Setup com React Router (páginas pública e admin)',
      'Zustand Store para gerenciar config do host',
    ],
  },
  {
    id: 2,
    title: 'Página Pública de Agendamento',
    description: 'O coração do app: onde recrutadores/guests escolhem horário e agendam.',
    status: 'planned',
    icon: '📅',
    tasks: [
      'Página de seleção do tipo de reunião (cards com duração e descrição)',
      'Componente Calendário interativo com navegação por mês',
      'Seleção de horários disponíveis (slots visuais)',
      'Formulário de dados do guest (nome, email, assunto, mensagem)',
      'Tela de confirmação com resumo do agendamento',
      'Lógica de disponibilidade baseada na config do host',
    ],
  },
  {
    id: 3,
    title: 'Painel Admin (Host)',
    description: 'Onde o dono configura tudo: perfil, horários, tipos de reunião, aparência.',
    status: 'planned',
    icon: '⚙️',
    tasks: [
      'Página de Perfil: nome, foto, bio, email, timezone',
      'CRUD de Tipos de Reunião (nome, duração, descrição, cor)',
      'Configuração de Horários Disponíveis (grade semanal visual)',
      'Configuração de Aparência (cor tema, estilo da página pública)',
      'Preview em tempo real da página pública',
    ],
  },
  {
    id: 4,
    title: 'Integrações (Google Calendar + Email)',
    description: 'Conectar com Google Calendar para sync e enviar emails de confirmação.',
    status: 'planned',
    icon: '🔌',
    tasks: [
      'Google OAuth2 Flow (login e permissão do host)',
      'Integração Google Calendar API - ler disponibilidade',
      'Criar eventos automaticamente no Google Calendar ao agendar',
      'Envio de Emails de Confirmação (Resend/SendGrid)',
    ],
  },
  {
    id: 5,
    title: 'Polimento & Deploy',
    description: 'Deixar tudo bonito, responsivo, otimizado e em produção.',
    status: 'planned',
    icon: '🚀',
    tasks: [
      'Responsividade Mobile completa',
      'Animações e transições suaves',
      'SEO + Meta Tags + Open Graph (preview bonito no WhatsApp/LinkedIn)',
      'Deploy na Vercel com CI/CD',
    ],
  },
]

const features: Feature[] = [
  // Core
  {
    id: 'public-page',
    title: 'Página Pública de Agendamento',
    description: 'Link compartilhável onde guests escolhem horário e agendam em < 60 segundos.',
    icon: '🌐',
    category: 'core',
    priority: 'high',
  },
  {
    id: 'calendar-picker',
    title: 'Calendário Interativo',
    description: 'Visualização mensal com slots disponíveis destacados. Navegação fluida entre meses.',
    icon: '📆',
    category: 'core',
    priority: 'high',
  },
  {
    id: 'time-slots',
    title: 'Seleção de Horários',
    description: 'Slots de tempo configuráveis (15min, 30min, 1h). Buffer entre reuniões.',
    icon: '⏰',
    category: 'core',
    priority: 'high',
  },
  {
    id: 'booking-form',
    title: 'Formulário de Agendamento',
    description: 'Coleta nome, email, tipo de reunião e mensagem. Validação em tempo real.',
    icon: '📝',
    category: 'core',
    priority: 'high',
  },
  {
    id: 'confirmation',
    title: 'Confirmação Visual',
    description: 'Tela de sucesso com resumo, opção de adicionar ao calendário (Google/Outlook/Apple).',
    icon: '✅',
    category: 'core',
    priority: 'medium',
  },
  // Admin
  {
    id: 'host-profile',
    title: 'Perfil do Host',
    description: 'Configurar nome, foto, bio, email, timezone e link personalizado.',
    icon: '👤',
    category: 'admin',
    priority: 'high',
  },
  {
    id: 'meeting-types',
    title: 'Tipos de Reunião',
    description: 'Criar múltiplos tipos: Entrevista (45min), Quick Chat (15min), Deep Dive (1h).',
    icon: '📋',
    category: 'admin',
    priority: 'high',
  },
  {
    id: 'availability',
    title: 'Grade de Disponibilidade',
    description: 'Interface visual para definir horários disponíveis por dia da semana.',
    icon: '🗓️',
    category: 'admin',
    priority: 'high',
  },
  {
    id: 'appearance',
    title: 'Personalização Visual',
    description: 'Escolher cor tema, estilo da página pública, upload de foto de capa.',
    icon: '🎨',
    category: 'admin',
    priority: 'medium',
  },
  {
    id: 'block-dates',
    title: 'Bloqueio de Datas',
    description: 'Bloquear férias, feriados ou dias específicos sem disponibilidade.',
    icon: '🚫',
    category: 'admin',
    priority: 'medium',
  },
  // Integration
  {
    id: 'google-calendar',
    title: 'Google Calendar Sync',
    description: 'Lê eventos existentes para evitar conflitos. Cria eventos automaticamente ao agendar.',
    icon: '📅',
    category: 'integration',
    priority: 'high',
  },
  {
    id: 'google-oauth',
    title: 'Login com Google',
    description: 'OAuth2 para o host autorizar acesso ao calendário de forma segura.',
    icon: '🔐',
    category: 'integration',
    priority: 'high',
  },
  {
    id: 'email-confirmation',
    title: 'Emails de Confirmação',
    description: 'Envia confirmação para host e guest com detalhes da reunião.',
    icon: '📧',
    category: 'integration',
    priority: 'high',
  },
  {
    id: 'timezone',
    title: 'Detecção de Timezone',
    description: 'Detecta automaticamente o fuso do visitante e converte horários.',
    icon: '🌍',
    category: 'integration',
    priority: 'medium',
  },
  // Future
  {
    id: 'zoom-meet',
    title: 'Link Zoom/Meet Automático',
    description: 'Gera link de videoconferência automaticamente ao agendar.',
    icon: '🎥',
    category: 'future',
    priority: 'low',
  },
  {
    id: 'stripe-payment',
    title: 'Cobrança por Reunião',
    description: 'Integração com Stripe para cobrar por consultas/reuniões pagas.',
    icon: '💳',
    category: 'future',
    priority: 'low',
  },
  {
    id: 'embed-widget',
    title: 'Widget Embedável',
    description: 'Iframe para incorporar o agendamento em sites externos.',
    icon: '🔗',
    category: 'future',
    priority: 'low',
  },
  {
    id: 'qr-code',
    title: 'QR Code do Link',
    description: 'Gera QR code do link de agendamento para compartilhar offline.',
    icon: '📱',
    category: 'future',
    priority: 'low',
  },
]

const stack = [
  { name: 'React 18', role: 'UI Framework', icon: '⚛️' },
  { name: 'Vite', role: 'Build Tool', icon: '⚡' },
  { name: 'TypeScript', role: 'Type Safety', icon: '🔷' },
  { name: 'Tailwind CSS', role: 'Styling', icon: '🎨' },
  { name: 'Zustand', role: 'State Management', icon: '🐻' },
  { name: 'React Router', role: 'Routing', icon: '🧭' },
  { name: 'Google Calendar API', role: 'Calendar Sync', icon: '📅' },
  { name: 'Google OAuth2', role: 'Authentication', icon: '🔐' },
  { name: 'Resend', role: 'Email Service', icon: '📧' },
  { name: 'Supabase', role: 'Database', icon: '🗄️' },
  { name: 'Vercel', role: 'Deployment', icon: '▲' },
]

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'roadmap' | 'stack'>('overview')
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const [featureFilter, setFeatureFilter] = useState<string>('all')

  const filteredFeatures = featureFilter === 'all' 
    ? features 
    : features.filter(f => f.category === featureFilter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                📅 MeetMe
              </h1>
              <p className="text-slate-400 mt-1">Sistema de Agendamento de Reuniões — Planejamento do Projeto</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-emerald-400 text-sm font-medium">Specs Definidas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'overview', label: '📋 Visão Geral', },
              { id: 'features', label: '✨ Recursos' },
              { id: 'roadmap', label: '🗺️ Roadmap' },
              { id: 'stack', label: '🛠️ Stack' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'features' && (
          <FeaturesSection 
            features={filteredFeatures} 
            filter={featureFilter} 
            setFilter={setFeatureFilter} 
          />
        )}
        {activeTab === 'roadmap' && (
          <RoadmapSection 
            phases={phases} 
            expandedPhase={expandedPhase} 
            setExpandedPhase={setExpandedPhase} 
          />
        )}
        {activeTab === 'stack' && <StackSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            MeetMe — Planejamento SDD (Spec-Driven Development) • Estrutura baseada no sdd-ai-stack
          </p>
        </div>
      </footer>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">🎯 O que é o MeetMe?</h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          Um sistema de agendamento de reuniões pessoal, estilo Calendly, onde você configura seus 
          horários disponíveis, conecta seu Google Calendar, e compartilha um link único para que 
          recrutadores e profissionais agendem reuniões com você automaticamente.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm">
            🔗 Link compartilhável
          </span>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
            📅 Google Calendar Sync
          </span>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm">
            📧 Confirmação por Email
          </span>
          <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm">
            ⚡ Agendamento em 60s
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '5', label: 'Fases', icon: '📊' },
          { value: '22', label: 'Tasks', icon: '✅' },
          { value: '18', label: 'Recursos', icon: '✨' },
          { value: '11', label: 'Tecnologias', icon: '🛠️' },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Use Cases */}
      <div>
        <h3 className="text-xl font-bold mb-4">💡 Casos de Uso</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Para Recrutadores',
              description: 'Marcam entrevista diretamente no seu horário disponível, sem troca de emails.',
              icon: '👔',
              color: 'indigo',
            },
            {
              title: 'Para Freelancers',
              description: 'Clientes agendam reuniões de briefing ou review no seu calendário.',
              icon: '💼',
              color: 'purple',
            },
            {
              title: 'Para Networking',
              description: 'Compartilhe seu link em redes sociais para conexões agendarem um café virtual.',
              icon: '🤝',
              color: 'emerald',
            },
          ].map(useCase => (
            <div key={useCase.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-3">{useCase.icon}</div>
              <h4 className="font-semibold text-white mb-2">{useCase.title}</h4>
              <p className="text-slate-400 text-sm">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fluxo */}
      <div>
        <h3 className="text-xl font-bold mb-4">🔄 Fluxo do Agendamento</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {[
              { step: '1', text: 'Host configura horários e conecta Google Calendar', icon: '⚙️' },
              { step: '2', text: 'Host compartilha link (meetme.dev/schedule/marcelino)', icon: '🔗' },
              { step: '3', text: 'Guest acessa e seleciona tipo de reunião', icon: '📋' },
              { step: '4', text: 'Guest escolhe data e horário disponível', icon: '📅' },
              { step: '5', text: 'Guest preenche dados e confirma', icon: '✅' },
              { step: '6', text: 'Evento criado no Calendar + emails enviados', icon: '📧' },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-3 flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Step {item.step}</span>
                </div>
                <p className="text-sm text-slate-300 flex-1">{item.text}</p>
                {i < 5 && <span className="hidden md:block text-slate-600">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Configurações do Host */}
      <div>
        <h3 className="text-xl font-bold mb-4">⚙️ O que o Host pode configurar</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Perfil Público', items: ['Nome de exibição', 'Foto de perfil', 'Bio/descrição', 'Link personalizado'] },
            { title: 'Tipos de Reunião', items: ['Nome e duração', 'Descrição', 'Cor/ícone', 'Perguntas customizadas'] },
            { title: 'Disponibilidade', items: ['Horários por dia da semana', 'Buffer entre reuniões', 'Bloqueio de datas', 'Limite por dia'] },
            { title: 'Integrações', items: ['Google Calendar ID', 'Email de notificação', 'Timezone padrão', 'Cor tema da página'] },
          ].map(section => (
            <div key={section.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturesSection({ features, filter, setFilter }: { 
  features: Feature[]
  filter: string
  setFilter: (f: string) => void 
}) {
  const categories = [
    { id: 'all', label: 'Todos', icon: '🌐' },
    { id: 'core', label: 'Core', icon: '⚡' },
    { id: 'admin', label: 'Admin', icon: '⚙️' },
    { id: 'integration', label: 'Integrações', icon: '🔌' },
    { id: 'future', label: 'Futuro', icon: '🔮' },
  ]

  const priorityColors = {
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    low: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">✨ Recursos Planejados</h2>
        <p className="text-slate-400">Todos os recursos que o MeetMe vai ter, organizados por categoria e prioridade.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === cat.id
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map(feature => (
          <div
            key={feature.id}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs border ${priorityColors[feature.priority]}`}>
                {feature.priority === 'high' ? 'Alta' : feature.priority === 'medium' ? 'Média' : 'Baixa'}
              </span>
            </div>
            <h4 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
              {feature.title}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoadmapSection({ phases, expandedPhase, setExpandedPhase }: {
  phases: Phase[]
  expandedPhase: number | null
  setExpandedPhase: (p: number | null) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">🗺️ Roadmap de Desenvolvimento</h2>
        <p className="text-slate-400">5 fases de desenvolvimento, cada uma com tasks microscópicas para manter o foco.</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
          >
            {/* Phase Header */}
            <button
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              className="w-full p-5 flex items-center gap-4 text-left"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl">
                  {phase.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500 font-mono">FASE {phase.id}</span>
                  <span className="px-2 py-0.5 bg-slate-500/20 border border-slate-500/30 rounded-full text-xs text-slate-400">
                    {phase.status === 'planned' ? '📋 Planejado' : phase.status === 'in-progress' ? '🔄 Em andamento' : '✅ Concluído'}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg">{phase.title}</h3>
                <p className="text-slate-400 text-sm truncate">{phase.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-slate-500 text-sm">{phase.tasks.length} tasks</span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ml-2 inline-block ${expandedPhase === phase.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Phase Tasks */}
            {expandedPhase === phase.id && (
              <div className="px-5 pb-5 border-t border-white/5">
                <div className="pt-4 space-y-2">
                  {phase.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-6 h-6 rounded border border-slate-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-slate-500">{i + 1}</span>
                      </div>
                      <span className="text-sm text-slate-300">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
        <h3 className="font-bold text-amber-300 mb-3">⚡ Metodologia SDD (Spec-Driven Development)</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div>
            <p className="font-medium text-white mb-1">Fluxo de cada task:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Refinar (ler a task)</li>
              <li>Implementar (máx. 5 arquivos)</li>
              <li>Testar (build + visual)</li>
              <li>Loop de falha (se erro, volta)</li>
              <li>Concluir (marca [x] e para)</li>
            </ol>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Regras de ouro:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Tasks microscópicas (máx. 1h cada)</li>
              <li>Nunca pular steps</li>
              <li>Anti-abstração (sem micro-arquivos)</li>
              <li>Uma task por vez</li>
              <li>Só avança se build estiver verde</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StackSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">🛠️ Stack Tecnológica</h2>
        <p className="text-slate-400">Tecnologias escolhidas para o projeto, otimizadas para velocidade e produtividade.</p>
      </div>

      {/* Stack Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stack.map(tech => (
          <div key={tech.name} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
            <div className="text-2xl mb-2">{tech.icon}</div>
            <h4 className="font-semibold text-white">{tech.name}</h4>
            <p className="text-slate-400 text-sm">{tech.role}</p>
          </div>
        ))}
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">📂 Estrutura de Arquivos</h3>
        <pre className="text-sm text-slate-300 font-mono overflow-x-auto bg-black/30 rounded-lg p-4">
{`src/
├── App.tsx              → Entry point com rotas
├── main.tsx             → Bootstrap React
├── index.css            → Tailwind base
├── components/          → UI burra (Button, Input, Card, Modal)
├── features/
│   ├── scheduling/      → 📅 Página pública de agendamento
│   │   ├── components/  → Calendar, TimeSlots, BookingForm
│   │   ├── pages/       → SchedulingPage, ConfirmationPage
│   │   ├── hooks/       → useAvailability, useBooking
│   │   └── store.ts     → Zustand store da feature
│   ├── admin/           → ⚙️ Painel de configuração
│   │   ├── components/  → MeetingTypeForm, AvailabilityGrid
│   │   ├── pages/       → AdminDashboard, SettingsPage
│   │   └── store.ts     → Zustand store do admin
│   ├── auth/            → 🔐 Autenticação
│   └── calendar/        → 📆 Componentes de calendário
├── core/                → DI Container, configs, tipos
├── hooks/               → Hooks globais
├── store/               → Zustand stores globais
├── lib/                 → Google API, Email service
└── utils/               → date helpers, formatters`}
        </pre>
      </div>

      {/* Configuração para o Host */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6">
        <h3 className="font-bold text-emerald-300 mb-3">🔧 Como vai funcionar a configuração</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <span className="text-lg">1️⃣</span>
            <div>
              <p className="font-medium text-white">Google Calendar</p>
              <p className="text-slate-400">Host faz login com Google → autoriza acesso ao calendário → app lê disponibilidade automaticamente e cria eventos ao agendar.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">2️⃣</span>
            <div>
              <p className="font-medium text-white">Email</p>
              <p className="text-slate-400">Configura email no painel admin → recebe notificação a cada novo agendamento → guest também recebe confirmação.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">3️⃣</span>
            <div>
              <p className="font-medium text-white">Link Público</p>
              <p className="text-slate-400">Link único gerado automaticamente (ex: meetme.dev/schedule/marcelino) → compartilhável em qualquer lugar → sem login para guests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
