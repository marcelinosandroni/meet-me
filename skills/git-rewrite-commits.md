# 🔧 Git — Reescrever Commits com Suas Credenciais

> Skill para corrigir autor de commits antigos e configurar git corretamente.

---

## 1. Configurar suas credencias (obrigatório primeiro)

```bash
# No terminal, dentro da pasta do projeto:
git config user.name "Marcelino Sandroni"
git config user.email "seu-email@github.com"

# Verificar se pegou:
git config user.name
git config user.email
```

> 💡 Pra ficar global (todos os repos): adicione `--global` nos comandos.

---

## 2. Ver o log atual (antes de reescrever)

```bash
# Versão bonita e resumida:
git log --oneline --graph --all

# Versão com autor visível:
git log --pretty=format:"%h | %an <%ae> | %s | %ar" -20

# Versão super detalhada:
git log --pretty=fuller -10
```

---

## 3. Reescrever TODOS os commits com seu autor

### Opção A — Rebase (mais seguro, interativo)

```bash
# Reescreve todos os commits do repo com o autor atual (você)
git rebase --root --exec 'git commit --amend --reset-author --no-edit'
```

### Opção B — Filter-branch (mais agressivo)

```bash
# Substitui autor em TODO o histórico
git filter-branch --env-filter '
  export GIT_AUTHOR_NAME="Marcelino Sandroni"
  export GIT_AUTHOR_EMAIL="seu-email@github.com"
  export GIT_COMMITTER_NAME="Marcelino Sandroni"
  export GIT_COMMITTER_EMAIL="seu-email@github.com"
' --tag-name-filter cat -- --all
```

### Opção C — Script com git-filter-repo (moderno, recomendado)

```bash
# Instalar (uma vez só):
pip install git-filter-repo

# Rodar:
git filter-repo --mailmap <(echo "Marcelino Sandroni <seu-email@github.com>")
```

---

## 4. Forçar push (se já tinha pushado)

```bash
# ⚠️ CUIDADO: isso reescreve o histórico remoto
git push --force --all
git push --force --tags
```

> ⚠️ **NUNCA** faça `--force` em repo compartilhado sem avisar o time.

---

## 5. Verificar se funcionou

```bash
# Log com autor visível:
git log --pretty=format:"%h | %an | %s" -20

# Ver todos os autores únicos do repo:
git log --format="%an <%ae>" | sort -u
```

---

## 🎯 Comando Rápido (copiar e colar)

Pra resolver tudo de uma vez:

```bash
# 1. Configurar
git config user.name "Marcelino Sandroni"
git config user.email "seu-email@github.com"

# 2. Reescrever
git rebase --root --exec 'git commit --amend --reset-author --no-edit'

# 3. Verificar
git log --pretty=format:"%h | %an | %s" -10

# 4. Push (se necessário)
git push --force --all
```

---

## 🚨 Quando usar cada opção

| Situação | Comando |
|----------|---------|
| Repo local, nunca pushou | Opção A (rebase) |
| Repo já pushado, só você usa | Opção A + force push |
| Repo compartilhado | ⚠️ NÃO reescreva, fala com o time |
| Histórico gigante (1000+ commits) | Opção C (filter-repo) |

---

## 💡 Dica: Prevenir no futuro

Cria um hook pra sempre validar o autor antes do commit:

```bash
# .git/hooks/pre-commit
#!/bin/sh
EXPECTED_NAME="Marcelino Sandroni"
ACTUAL_NAME=$(git config user.name)
if [ "$ACTUAL_NAME" != "$EXPECTED_NAME" ]; then
  echo "❌ Autor errado: $ACTUAL_NAME (esperado: $EXPECTED_NAME)"
  exit 1
fi
```

```bash
# Dar permissão:
chmod +x .git/hooks/pre-commit
```
