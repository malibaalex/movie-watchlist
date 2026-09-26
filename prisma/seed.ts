import "temporal-polyfill/full/global";
import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../prisma/contract.d";
import contractJson from "../prisma/contract.json" with { type: "json" };

const db = postgres<Contract>({
  contractJson,
  url: process.env["DATABASE_URL"]!,
});

async function main() {
  // Start from empty tables so this can run more than once.
  // Delete children first: MovieGenre depends on Movie and Genre.
  await db.orm.public.MovieGenre.where({}).deleteAll();
  await db.orm.public.Movie.where({}).deleteAll();
  await db.orm.public.Genre.where({}).deleteAll();

  // Genres
  const [action, comedy, drama, scifi, animation] = await Promise.all([
    db.orm.public.Genre.create({ name: "Action" }),
    db.orm.public.Genre.create({ name: "Comedy" }),
    db.orm.public.Genre.create({ name: "Drama" }),
    db.orm.public.Genre.create({ name: "Sci-Fi" }),
    db.orm.public.Genre.create({ name: "Animation" }),
  ]);

  // Movies
  const lastSignal = await db.orm.public.Movie.create({
    title: "The Last Signal",
    description:
      "A stranded crew races to send one final transmission before the ship goes dark.",
    releaseYear: 2021,
  });

  const laughTrack = await db.orm.public.Movie.create({
    title: "Laugh Track",
    description:
      "A failing sitcom writer gets one more shot at a comeback special.",
    releaseYear: 2019,
  });

  const quietHarbor = await db.orm.public.Movie.create({
    title: "Quiet Harbor",
    description: "A slow-burn drama about a fishing town confronting its past.",
    releaseYear: 2023,
  });

  const nebulaDrift = await db.orm.public.Movie.create({
    title: "Nebula Drift",
    description:
      "Explorers discover a derelict station hiding an ancient secret.",
    releaseYear: 2022,
  });

  const paperKingdoms = await db.orm.public.Movie.create({
    title: "Paper Kingdoms",
    description: "An animated tale of two rival paper-craft kingdoms at war.",
    releaseYear: 2020,
  });

  // Movie <-> Genre links (join rows written directly, same as PostTag in the docs,
  // since MovieGenre's fields are both required foreign keys)
  await Promise.all([
    db.orm.public.MovieGenre.create({
      movieId: lastSignal.id,
      genreId: action.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: lastSignal.id,
      genreId: scifi.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: laughTrack.id,
      genreId: comedy.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: quietHarbor.id,
      genreId: drama.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: nebulaDrift.id,
      genreId: scifi.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: nebulaDrift.id,
      genreId: action.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: paperKingdoms.id,
      genreId: animation.id,
    }),
    db.orm.public.MovieGenre.create({
      movieId: paperKingdoms.id,
      genreId: comedy.id,
    }),
  ]);

  console.log("Seeded:", {
    genres: [action, comedy, drama, scifi, animation].map((g) => g.name),
    movies: [
      lastSignal,
      laughTrack,
      quietHarbor,
      nebulaDrift,
      paperKingdoms,
    ].map((m) => m.title),
  });

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
