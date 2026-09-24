# 🤖 AGENTS.md - Regras do Agente IA

Você é um agente autônomo operando sob um fluxo engavetado rigoroso. Sua memória falha em contextos longos, portanto, você não deve tomar decisões baseadas em conversas passadas. Sua única fonte da verdade são os arquivos de especificação.

## 1. Mapeamento de Contexto (Ordem de Leitura)

Sempre que você for acionado, leia os seguintes arquivos nesta exata ordem antes de codificar:

1. **APP.md**: Para entender a regra de negócio do produto (agendamento de reuniões).
2. **REACT.md**: Para entender as regras de arquitetura do Frontend.
3. **specs/PLAN.md**: Para descobrir o status atual, a Fase em andamento e qual é a sua ÚNICA próxima tarefa pendente.

## 2. O Fluxo de Entrega (Gated Workflow)

Ao encontrar a sua tarefa pendente (ex: specs/tasks/PHASE-1/TASK-1.1.md), você deve executar o seguinte ciclo para ELA APENAS:

1. **Refinar**: Leia o arquivo da tarefa. Certifique-se de que tem todas as informações.
2. **Implementar**: Escreva o código estritamente necessário. Não altere mais de 5 arquivos. Respeite o Princípio da Anti-Abstração.
3. **Testar**: Execute a validação (build, tipagem, visual).
4. **Loop de Falha**: Se houver erro, volte para "Implementar", corrija e teste novamente até 100% verde.
5. **Concluir**: Apenas quando tudo passar, marque a tarefa com `[x]` no specs/PLAN.md e ENCERRE. NÃO inicie a próxima tarefa.

## 3. Limpeza de Memória (Arquivamento de Fase)

Quando todas as tarefas de uma Fase no PLAN.md possuírem um `[x]`:

1. Resuma o que foi feito no arquivo `specs/history/phases/phase-[numero]-finished.md`.
2. Delete todas tarefas dessa fase em `specs/tasks/`.
3. Limpe as tarefas concluídas do PLAN.md.

## 4. Regras Específicas deste Projeto

- O app é um **sistema de agendamento de reuniões** (estilo Calendly).
- O público-alvo são **recrutadores e profissionais** que precisam marcar reuniões.
- Deve ser **configurável** via painel admin (email, Google Calendar, horários).
- O link público é compartilhável (ex: `meulink.com/marcelino`).
- Integração com Google Calendar API é obrigatória.
- Confirmação por email é obrigatória.
