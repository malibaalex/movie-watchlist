import { badRequest, handle, json } from "@/lib/http";
import { prisma } from "@/lib/prisma";

// POST /api/genres  { name }
const createGenre = handle("POST /api/genres", async (req: Request) => {
  const { name } = await req.json();

  if (!name) return badRequest("name is required");

  const genre = await prisma.orm.public.Genre.create({ name });
  return json(genre, 201);
});

export default createGenre;
