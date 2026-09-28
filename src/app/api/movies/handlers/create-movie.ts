import { badRequest, handle, json } from "@/lib/http";
import { prisma } from "@/lib/prisma";

type CreateMovieBody = {
  title: string;
  description: string;
  releaseYear: number;
};

const createMovie = handle("POST /api/movies", async (req: Request) => {
  const { title, description, releaseYear } =
    (await req.json()) as CreateMovieBody;

  if (!title || !description || !Number.isInteger(releaseYear)) {
    return badRequest("title, description and releaseYear are required");
  }

  const movie = await prisma.orm.public.Movie.create({
    title,
    description,
    releaseYear,
  });
  return json(movie, 201);
});

export default createMovie;
