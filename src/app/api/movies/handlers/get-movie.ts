import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handle, notFound, RouteContext } from "@/lib/http";

// GET /api/movies/:id
const getMovie = handle(
  "GET /api/movies/[id]",
  async (_req: Request, { params }: RouteContext) => {
    const { id } = await params;
    const movie = await prisma.orm.public.Movie.where({ id }).first();

    return movie ? NextResponse.json(movie) : notFound("Movie");
  },
);

export default getMovie;
