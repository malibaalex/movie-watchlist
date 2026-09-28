import { badRequest, handle, json, notFound } from "@/lib/http";
import { RouteContext } from "@/lib/http";
import { prisma } from "@/lib/prisma";

// POST /api/genres/:id  { name }  -> rename
const updateGenre = handle(
  "POST /api/genres/[id]",
  async (req: Request, { params }: RouteContext) => {
    const { id } = await params;
    const { name } = await req.json();

    if (!name) return badRequest("name is required");

    const genre = await prisma.orm.public.Genre.where({ id }).update({ name });
    return genre ? json(genre) : notFound("Genre");
  },
);

export default updateGenre;
