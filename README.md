<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

---
## 📚 Documentation

Full API documentation is available at the following link:

👉 [https://kanggo.dedypry.id/](https://kanggo.dedypry.id/)
---



## 🧾 Description

This project is a microservices-based backend built using [NestJS](https://nestjs.com), TypeScript, and gRPC. It provides a scalable architecture for managing orders, workers, and authentication.

---

## 🧱 Architecture

The system consists of the following services:

- **Gateway** – Main API gateway that handles incoming requests via gRPC
- **Auth Service** – Handles user registration, login, and authentication logic
- **Order Service** – Manages order creation, status updates, and worker assignments
- **Worker Service** – Manages worker profiles and availability

All services are connected using **gRPC** and are orchestrated using **Docker Compose**.

---

## 📦 Tech Stack

- **[NestJS](https://nestjs.com/)** – A modular framework built on top of Express.js
- **Express.js** – Default HTTP server for NestJS
- **gRPC** – Used for microservice-to-microservice communication
- **PostgreSQL** – Relational database
- **Knex.js + Objection.js** – SQL query builder and ORM
- **Docker & Docker Compose** – Containerized environment setup
- **Joi** – Schema validation
- **Cron Jobs (Schedule)** – Scheduled tasks using `@nestjs/schedule`

---

## ⏲️ Cron Jobs

The **Order Service** includes scheduled tasks (cron jobs):

- ⏰ **07:00 AM (server time)** – Automatically updates orders starting today to status `active`
- ⏰ **05:00 PM (server time)** – Automatically updates orders ending today to status `complete`

These are powered by `@nestjs/schedule`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)

### Installation

```bash
# Copy .env from .env.example
cp .env.example .env

npm i -g pnpm

pnpm config set registry https://registry.npmjs.org

# Install dependencies
pnpm install

# Start development environment
docker-compose up

# Or Start in the background
docker-compose up -d




