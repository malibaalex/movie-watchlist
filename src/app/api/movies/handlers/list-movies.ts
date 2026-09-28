import { prisma } from "@/lib/prisma";

export const listMoviesHandler = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const q = searchParams.get("q")?.trim().toLowerCase();
    const genreId = searchParams.get("genre");

    let movies = await prisma.orm.public.Movie.all();

    if (yearParam) {
      const year = Number(yearParam);
      if (!Number.isInteger(year)) {
        return Response.json(
          { error: "year must be an integer" },
          { status: 400 },
        );
      }
      movies = movies.filter((m) => m.releaseYear === year);
    }

    if (q) {
      movies = movies.filter((m) => m.title.toLowerCase().includes(q));
    }

    if (genreId) {
      const links = await prisma.orm.public.MovieGenre.where({ genreId }).all();
      const movieIds = new Set(links.map((l) => l.movieId));
      movies = movies.filter((m) => movieIds.has(m.id));
    }

    return Response.json(movies, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export type MoviesResponse = Awaited<
  ReturnType<typeof prisma.orm.public.Movie.all>
>;
export type Movie = MoviesResponse[number];
