# Movie Watchlist

A simple dark-mode movie watchlist built with Next.js (App Router), TypeScript, Tailwind CSS and Prisma.

The app is **read-only from the UI**: you browse a list of seeded movies and open a detail page for each one.

## Features

- Movie grid at `/` with poster, title, year and a short description
- Movie detail page at `/movies/[id]`
- Dark mode UI
- REST API for movies and genres, backed by a seeded database

## Important note about the API

This is a personal watchlist with **no authentication and no authorization**. There are no users, roles or admin area.

Because of that, the UI only uses the endpoints that read data. The create, update and delete endpoints (for both movies and genres) were implemented **only for learning**: to understand how to structure route handlers, validate input, and work with the Prisma ORM. They are not connected to the frontend, and they are not safe to expose publicly, since anyone could call them.

If you ever deploy this, remove those handlers or protect them behind auth first.

## Endpoints

### Movies

| Method | Route                    | Used by UI    | Purpose                |
| ------ | ------------------------ | ------------- | ---------------------- |
| GET    | `/api/movies`            | Yes           | List all movies        |
| GET    | `/api/movies?genre=<id>` | No            | List movies in a genre |
| GET    | `/api/movies/:id`        | Yes           | Get one movie          |
| POST   | `/api/movies`            | No (learning) | Create a movie         |
| POST   | `/api/movies/:id`        | No (learning) | Update a movie         |
| DELETE | `/api/movies/:id`        | No (learning) | Delete a movie         |

### Genres

Genre handlers live in `src/app/api/genre/` and cover list, get one, create, update and delete. None of them are used by the UI, and they were built for learning as well.

## Data model

Defined in `prisma/contract.prisma`:

- **Movie**: `id`, `title`, `description?`, `releaseYear?`, timestamps
- **Genre**: `id`, `name` (unique)
- **MovieGenre**: join table linking movies and genres (many-to-many)

The schema has no image field, so the posters shown in the UI are placeholders from [picsum.photos](https://picsum.photos), seeded by movie id. To use real posters, add a `posterUrl` field to the schema and update `posterFor` in the two page files.

## Getting started

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
```

Set up the database and seed it using the scripts in `package.json` and the seed file at `prisma/seed.ts`, then start the dev server:

```bash
pnpm dev
```

Open <http://localhost:3000>.

## Project structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx                  # Movie list (/)
│   ├── movies/
│   │   └── [id]/
│   │       └── page.tsx          # Movie detail (/movies/:id)
│   └── api/
│       ├── movies/
│       │   ├── route.ts          # GET, POST
│       │   ├── [id]/route.ts     # GET, POST (update), DELETE
│       │   └── handlers/         # one file per operation
│       └── genre/
│           ├── route.ts
│           ├── [id]/route.ts
│           └── handlers/
└── lib/
    ├── http.ts                   # handle(), json(), badRequest(), notFound()
    └── prisma.ts                 # Prisma client

prisma/
├── contract.prisma               # Data model
└── seed.ts                       # Seed data

migrations/                       # Generated migration data
```

## Tech stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Prisma
- pnpm
