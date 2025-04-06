# Fastify Clean Architecture API

## Introdução

Uma API autodocumentável construída com Fastify, utilizando arquitetura limpa, SOLID e DDD. Gerencia autenticação de usuários com foco em simplicidade e boas práticas.

## Tecnologias

- Linguagem: [Node.js](https://nodejs.org)
- Framework: [Fastify.js](https://www.fastify.io)
- ORM: [PrismaORM](https://www.prisma.io)
- Documentação [Swagger](https://swagger.io/)
- Banco de Dados: [PostgreSQL](https://www.postgresql.org)
- Autenticação: [JWT](https://jwt.io)
- Gerenciamento de Dependências: [pnpm](https://pnpm.io)
- Linter: [ESLint](https://eslint.org)
- Testes: [Vitest](https://vitest.dev)

## Endpoints

| Método   | Endpoint         | Descrição                                   |
| -------- | ---------------- | ------------------------------------------- |
| **POST** | `/auth/sign-up`  | Registrar um novo usuário                   |
| **POST** | `/auth/sign-in`  | Fazer login e obter o token de autenticação |
| **GET**  | `/users/profile` | Obter o perfil do usuário autenticado       |

## Instalação

Clone o repositório:

```bash
git clone https://github.com/izaiasmorais/fastify-clean-architecture
cd fastify-clean-architecture
```

## Instale as dependências:

```bash
pnpm install
```

## Configure o arquivo .env com suas credenciais (baseado no .env.example):

```env
NODE_ENV=development
ENV_EXPIRES_IN=10000
ENV_PORT=3333
DATABASE_URL=
```

# Executando o Projeto

## Inicie o servidor:

```bash
pnpm dev
```
