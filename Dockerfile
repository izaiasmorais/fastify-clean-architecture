# Estágio de desenvolvimento
FROM node:20.18.1-alpine AS development

# Definir o diretório de trabalho no contêiner
WORKDIR /app-dev

# Instalar dependências necessárias para o Prisma e pnpm
RUN apk add --no-cache openssl \
    && npm install -g pnpm

# Copiar os arquivos de dependência primeiro para otimizar o cache de construção
COPY package.json pnpm-lock.yaml ./

# Instalar dependências com pnpm
RUN pnpm install --frozen-lockfile

COPY . .

# Executar testes
#RUN pnpm test

# Gera o Prisma Client
RUN pnpm dlx prisma generate

# Construa a aplicação
RUN pnpm build

# Estágio de produção
FROM node:20.18.1-alpine AS production

# Definir a variável de ambiente NODE_ENV para produção
ENV NODE_ENV=production

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Instalar dependências necessárias para o Prisma e pnpm
RUN apk add --no-cache openssl \
    && npm install -g pnpm

# Copiar os arquivos de dependência primeiro para otimizar o cache de construção
COPY package.json pnpm-lock.yaml ./

# Instalar dependências com pnpm
RUN pnpm install --frozen-lockfile --prod

# Copia os arquivos da aplicação e o Prisma Client
COPY --from=development /app-dev/dist ./
COPY --from=development /app-dev/prisma ./prisma

# Gera o Prisma Client
RUN pnpm dlx prisma generate

# Expor a porta do contêiner
EXPOSE 3000

# Comando para rodar o servidor após a inicialização
CMD ["node", "infra/http/server.js"]
