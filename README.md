# nestjs-library-api
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
# 📚 NestJS Library API

A simple REST API built with NestJS, Prisma, PostgreSQL, and Docker to manage books and authors. Includes Swagger API documentation and Prisma ORM for database interaction.

---

## 🚀 Features

- CRUD for Authors and Books
- PostgreSQL integration using Prisma ORM
- Swagger UI for API exploration
- Dockerized environment for easy deployment

---

## 🧾 Project Structure

📁 src
┣ 📁 author # Author module (controller, service, DTOs)
┣ 📁 book # Book module (controller, service, DTOs)
┣ 📁 prisma # PrismaService + Prisma schema
┣ 📜 app.module.ts # Root application module
┗ 📜 main.ts # Application bootstrap
📄 docker-compose.yml
📄 Dockerfile
📄 .env
📄 README.md



---

## ⚙️ Prerequisites

- Node.js (v18+ recommended)
- Docker & Docker Compose
- npm or yarn

---

## 🔧 Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/syedowaisalishah/nestjs-library-api.git
cd nestjs-library-api
```

2. **nstall dependencies**
``` bash
npm install
```

3 . **Set up environment variables**
Create a .env file in the root directory:

``` bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/library?schema=public"
PORT=3000
```
Make sure the DB URL matches your local Postgres setup if you're not using Docker.

4.  **Generate Prisma Client**

```bash
npx prisma generate
```

6. **Start the Application**
```bash
npm run start:dev
```   

## 🐳 Run With Docker

Easiest way to spin up the API + database with just one command.

1. **Build and start the app**

```bash
docker-compose up --build
```

2. Access the API

- API Base URL: http://localhost:3000
- Swagger Docs: http://localhost:3000/api

## 📘 API Documentation (Swagger)

Access API documentation at:

```bash
http://localhost:3000/api
```

You can use Swagger to:
- Try POST, GET, PATCH, DELETE requests
- See request/response format
- View validation requirements

## 🔁 Sample API Requests (Using curl or Postman)

**➕ Create Author**
```bash
curl -X POST http://localhost:3000/author \
-H "Content-Type: application/json" \
-d '{"name":"J.K. Rowling","bio":"Author of Harry Potter"}'
```

**🔍 Get All Authors**
```bash
curl http://localhost:3000/author
```

**📝 Update Author**
```bash
curl -X PATCH http://localhost:3000/author/1 \
-H "Content-Type: application/json" \
-d '{"bio":"Updated bio"}'
```

**❌ Delete Author**
```bash
curl -X DELETE http://localhost:3000/author/1
```

## 📂 Prisma Schema Example
```bash
model Author {
  id    Int     @id @default(autoincrement())
  name  String
  bio   String?
  books Book[]
}

model Book {
  id        Int     @id @default(autoincrement())
  title     String
  year      Int
  authorId  Int
  author    Author  @relation(fields: [authorId], references: [id])
}
```

## 💻 Contributing
Feel free to fork this repo, open issues, or submit PRs.

## 🧠 Credits
Developed by Syed Owais Ali Shah
Built with using NestJS and Prisma



## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
>>>>>>> dca955e (Initial working API with Swagger and Prisma)
