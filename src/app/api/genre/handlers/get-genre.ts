import { handle, json, notFound } from "@/lib/http";
import { RouteContext } from "@/lib/http";
import { prisma } from "@/lib/prisma";

// GET /api/genres/:id
const getGenre = handle(
  "GET /api/genres/[id]",
  async (_req: Request, { params }: RouteContext) => {
    const { id } = await params;
    const genre = await prisma.orm.public.Genre.where({ id }).first();

    return genre ? json(genre) : notFound("Genre");
  },
);

export default getGenre;
