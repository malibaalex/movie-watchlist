import { handle, notFound } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { RouteContext } from "@/lib/http";

// DELETE /api/movies/:id
export const deleteMovie = handle(
  "DELETE /api/movies/[id]",
  async (_req: Request, { params }: RouteContext) => {
    const { id } = await params;

    await prisma.orm.public.MovieGenre.where({ movieId: id }).deleteAll();
    const deleted = await prisma.orm.public.Movie.where({ id }).delete();

    return deleted ? new Response(null, { status: 204 }) : notFound("Movie");
  },
);

export default deleteMovie;
