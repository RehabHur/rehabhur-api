# Etapa 1: compilar TypeScript
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma7.config.ts ./prisma7.config.ts
COPY tsconfig*.json ./
COPY src ./src
RUN npm ci
RUN npm run build

# Etapa 2: imagen final con dependencias de producción
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
