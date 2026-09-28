import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const getMovieHandler = async (req: Request, { params }: RouteContext) => {
  try {
    const { id } = await params;

    const movie = prisma.orm.public.Movie.where({
      id: id,
    }).first();

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error("GET /api/movies/[id] failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export default getMovieHandler;
