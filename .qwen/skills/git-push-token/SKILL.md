---
name: git-push-token
description: Faz push de uma branch para o GitHub usando HTTPS com token de acesso pessoal embutido na URL.
---

# Git Push com Token

## Uso
Execute no diretório do repositório:

```bash
git push --force https://${GIT_USERNAME}:${GIT_USERTOKEN}@github.com/${OWNER}/${REPO}.git ${BRANCH}
```

## Variáveis
- GIT_USERNAME: usuário do GitHub (ex.: marcelinosandroni)
- GIT_USERTOKEN: personal access token (ghp_...)
- OWNER/REPO: dono e nome do repositório
- BRANCH: branch local a enviar

## Observações
- Nunca commitar o token em arquivos rastreados pelo git.
- Usar --force apenas quando solicitado explicitamente pelo usuário.
