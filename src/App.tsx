/**
 * 📅 MeetMe - App Principal
 * 
 * Este é o entry point do app REAL de agendamento.
 * O planejamento visual do produto está em: docs/planning/
 * Para ver o planning: npm run docs
 * 
 * TODO: Implementar conforme specs/PLAN.md
 */

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="text-6xl">📅</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          MeetMe
        </h1>
        <p className="text-slate-400 text-lg">
          Sistema de Agendamento de Reuniões
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
          <p className="text-slate-300 text-sm">
            🚧 App em construção seguindo o roadmap SDD
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs">
              Fase 1: Setup & Base UI
            </span>
            <span className="px-3 py-1 bg-slate-500/20 border border-slate-500/30 rounded-full text-slate-400 text-xs">
              22 tasks planejadas
            </span>
          </div>
        </div>
        <div className="text-xs text-slate-500 space-y-1">
          <p>📋 Planejamento: <code className="text-indigo-400">npm run docs</code></p>
          <p>📂 Specs: <code className="text-indigo-400">specs/PLAN.md</code></p>
          <p>🤖 Regras: <code className="text-indigo-400">AGENTS.md</code></p>
        </div>
      </div>
    </div>
  )
}

export default App
