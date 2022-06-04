## Erro na integração do container com o GIT

Ao subir o container o git não funciona. Ao rodar o comando `git rev-parse --git-dir` obtive a reposta:

```
git config --global --add safe.directory /workspaces/igreja-front
```

Ao rodar o comando acima, tudo funcionou!


## Assinando os commits

Inicialmente deve-se criar as chaves usando o comando:
```
gpg --full-generate-key
```

Em seguida é necessário colocar a chave nas plataformas onde se quer assinar os commits (Github, Gitlab). Para lista as chaves usa-se o comando:
```
gpg --list-secret-keys --keyid-format=long
```
O resultado desse comando pode ser visto  abaixo. 
```
/home/danilodcn/.gnupg/pubring.kbx
----------------------------------
sec   rsa4096/4B2B0E463E4673E4 2022-06-04 [SC] [expires: 2022-08-03]
      8B1ADAC127708B471CAC53CF4B2B0E463E4673E4
uid                 [ultimate] Danilo Nascimento <daconnas.dcn@gmail.com>
ssb   rsa4096/54C6C13DE2CD88B3 2022-06-04 [E] [expires: 2022-08-03]
```

Para gerar a chave usa-se o comando:
```
gpg --armor --export 54C6C13DE2CD88B3
```

A saída do comando é a chave pública.

### Configurando o git

Em um repositório local usa-se o comando:
```
git config --local commit.gpgSign true
```

Em seguida faz-se uma configuração global para uso da chave criada anteriormente paras as assinaturas dos commits.

```
git config --global commit.signingkey 54C6C13DE2CD88B3
```

### Configurando inserção de senha automaticamente

