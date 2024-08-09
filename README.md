# Janjiraga API

Janjiraga REST API is a web service that provides access to [Janjiraga](https://janjiraga.com/).

## Tech Stack

- [Hono](https://hono.dev/) over [Bun](https://bun.sh/) runtime
- [Typescript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Render](https://render.com/)
- [Neon](https://neon.tech/)

## API Specification

| Endpoint          | HTTP     | Description               |
| ----------------- | -------- | ------------------------- |
| `/categories`     | `GET`    | Get all categories        |
| `/categories`     | `POST`   | Add new catetory          |
| `/categories`     | `DELETE` | Delete all categories     |
| `/categories/:id` | `DELETE` | Delete one category by id |
| `/categories/:id` | `PUT`    | Update one category by id |

The OpenAPI Specification for the Janjiraga API offers a detailed description of the API's services. It can be accessed at the path `/api-spec`.

For a more interactive experience, you can use SwaggerUI. It provides a user-friendly interface for exploring and testing the API. You can access SwaggerUI at `/ui`.

You can also access the following:

- OpenAPI Specification: https://api.janjiraga.com/api-spec
- SwaggerUI: https://api.janjiraga.com/ui

## Database Design

To view the latest database design in more detail, you can navigate to the following link: [ERD](https://dbdocs.io/janjiraga.com/janjiraga)

![ERD](./assets/erd.svg)

## Getting Started

Set up `.env` by copying from `.env.example` for reference

```sh
cp .env.example .env
```

Install dependencies

```sh
bun install
```

Run DB migration

```sh
bun run migrate:dev
```

Then you can run

```sh
bun run dev
```

Afterwards, open your browser and navigate to http://localhost:3000 to start exploring the API.
