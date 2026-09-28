import { prisma } from "@/lib/prisma";
import { handle, json } from "@/lib/http";

// GET /api/genres
const getAllGenres = handle("GET /api/genres", async () => {
  return json(await prisma.orm.public.Genre.all());
});

export default getAllGenres;
