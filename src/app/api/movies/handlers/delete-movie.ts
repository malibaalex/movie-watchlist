import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const deleteMovieHandler = async (req: Request, { params }: RouteContext) => {
  const { id } = await params;

  const existingMovie = await prisma.orm.public.Movie.where({ id }).first();
  if (!existingMovie) {
    return Response.json({ error: "Movie not found" }, { status: 404 });
  }

  await prisma.orm.public.MovieGenre.where({ movieId: id }).deleteAll();
  await prisma.orm.public.Movie.where({ id }).delete();

  return new Response(null, { status: 204 });
};

export default deleteMovieHandler;
