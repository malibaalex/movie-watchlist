import { handle, notFound } from "@/lib/http";
import { RouteContext } from "@/lib/http";
import { prisma } from "@/lib/prisma";

// DELETE /api/genres/:id
const deleteGenre = handle(
  "DELETE /api/genres/[id]",
  async (_req: Request, { params }: RouteContext) => {
    const { id } = await params;

    await prisma.orm.public.MovieGenre.where({ genreId: id }).deleteAll();
    const deleted = await prisma.orm.public.Genre.where({ id }).delete();

    return deleted ? new Response(null, { status: 204 }) : notFound("Genre");
  },
);

export default deleteGenre;
