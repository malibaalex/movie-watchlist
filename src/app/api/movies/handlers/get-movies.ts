import { handle, json } from "@/lib/http";
import { prisma } from "@/lib/prisma";

// GET /api/movies            -> all movies
// GET /api/movies?genre=<id> -> movies in that genre
export const getMovies = handle("GET /api/movies", async (req: Request) => {
  const genreId = new URL(req.url).searchParams.get("genre");

  if (!genreId) {
    return json(await prisma.orm.public.Movie.all());
  }

  const links = await prisma.orm.public.MovieGenre.where({ genreId }).all();
  if (links.length === 0) return json([]);

  const movieIds = links.map((l) => l.movieId);
  return json(
    await prisma.orm.public.Movie.where((m) => m.id.in(movieIds)).all(),
  );
});
