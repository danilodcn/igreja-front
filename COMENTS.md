## Erro na integração do container com o GIT

Ao subir o container o git não funciona. Ao rodar o comando `git rev-parse --git-dir` obtive a reposta:

```
git config --global --add safe.directory /workspaces/igreja-front
```

Ao rodar o comando acima, tudo funcionou!
