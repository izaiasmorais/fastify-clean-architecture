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

## Estrutura do Projeto

- prisma/ - Configuração do Prisma ORM para gerenciamento do banco de dados.
- src/ - Código-fonte principal da aplicação.
  - core/ - Componentes centrais e reutilizáveis.
    - entities/ - Definições de entidades "core" que serão usadas no domínio.
    - errors/ - Gerenciamento de erros personalizados.
    - types/ - Definições de tipos TypeScript.
    - utils/ - Funções utilitárias e helpers.
  - domain/ - Lógica de negócio e regras do domínio.
    - cryptography/ - Abstrações das classes que envolvem criptografia.
    - entities/ - Entidades específicas do domínio.
    - repositories/ - Interfaces de repositórios para acesso a dados.
    - use-cases/ - Casos de uso que implementam a lógica de negócio.
  - infra/ - Camada de infraestrutura e integrações externas.
    - adapters/ - Adaptadores para conectar domínio e infraestrutura.
    - database/prisma/ - Implementações específicas do Prisma.
      - mappers/ - Mapeamento entre modelos de dados e entidades.
      - repositories/ - Implementações concretas de repositórios.
      - use-cases/ - Casos de uso adaptados para infraestrutura.
      - prisma.ts - Configuração e inicialização do Prisma Client.
    - env/ - Configurações de variáveis de ambiente.
    - http/ - Configurações relacionadas à API HTTP.
      - controllers/ - Controladores para lidar com requisições HTTP.
      - middleware/ - Middlewares para processamento de requisições.
      - schemas/ - Esquemas de validação de dados.
      - error-handler.ts - Manipulação centralizada de erros HTTP.
      - server.ts - Inicialização e configuração do servidor Fastify.
  - test/ - Pasta que gerencia os arquivos necessários para a execução dos testes.
    - cryptography/ - Classes que simulam as funcionalidades de criar token e criptografar e comparar senhas criptografas.
    - factories/ - Funções que criam "mocks" das entidades para serem utilizadas nos testes.
    - repositories/ - Repositórios em memória para serem utilizados nos testes.

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

Instale as dependências:

```bash
pnpm install
```

Configure o arquivo .env com suas credenciais (baseado no .env.example):

```env
NODE_ENV=development
ENV_EXPIRES_IN=10000
ENV_PORT=3333
DATABASE_URL=
```

# Executando o Projeto

Inicie o servidor:

```bash
pnpm dev
```

# Executando os Testes

Testes unitários:

```bash
pnpm test
```

Testes E2E:

```bash
pnpm test:e2e
```
