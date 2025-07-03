FROM node:20
WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .