# Introdução

Esta API é responsável por sincronizar os dados do Nebula com os sistemas de gestão.

# Versionamento

- Node Version: 20.18.1
- Npm Version: 10.8.2
- Pnpm Version: 9.15.0

# Documentação

Para ver a documentação abra: http://localhost:3000/

# Rodando o código

Você precisa ter o Node.js instalado na sua máquina. Faça a instalação em [link](https://nodejs.org/).

Instale o pnpm na sua máquina através do npm que vem junto com o node.
```bash
npm install pnpm -g
```

Instale as depedências da aplicação.
```bash
pnpm install
```

Crie um arquivo `.env` com os valores abaixo:
```env
ENV_DATABASE_SERVER=161.97.70.96
ENV_DATABASE_PORT=33306
ENV_DATABASE_NAME=NebulaDB_dev
ENV_DATABASE_USER=usrnebuladev
ENV_DATABASE_PWD=8UOVmdRfJajn
ENV_DATABASE_SSL_MODE=none
ENV_DATABASE_MAXPOOLSIZE=75
ENV_FUSO_HORARIO=-3
ENV_DATABASE_URL=mysql://usrnebuladev:8UOVmdRfJajn@161.97.70.96:33306/NebulaDB_dev
ENV_PORT=3333
ENV_EXPIRES_IN=3600
ENV_NOME_IMAGEM=nebulasistemas/nebula-zap-api:dev
ENV_URL_WHATSAPP=https://whatsappapidev.sistemasnebula.com.br
ENV_LOCAL_WHATSAPP=-dev
NODE_ENV=Development
```

Atualize o schema do Prisma
```bash
pnpm prisma db pull
```

Gere o cliente do Prisma
```bash
npx prisma generate
```

Inicie a aplicação
```bash
pnpm dev
```

# Build do Projeto

Iniciar a build
```bash
pnpm build
```

# Subir a plicação no Docker

Suba a imagem para o docker
```bash
docker build -t sincronizador .
```
