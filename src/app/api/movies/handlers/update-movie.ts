import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const updateMovieHandler = async (
  req: Request,
  { params }: RouteContext,
) => {
  try {
    const { id } = await params;

    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body) {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const data: { title?: string; description?: string; releaseYear?: number } =
      {};

    if (body.title !== undefined) {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return Response.json(
          { error: "title must be a non-empty string" },
          { status: 400 },
        );
      }
      data.title = body.title.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return Response.json(
          { error: "description must be a string" },
          { status: 400 },
        );
      }
      data.description = body.description;
    }

    if (body.releaseYear !== undefined) {
      if (!Number.isInteger(body.releaseYear)) {
        return Response.json(
          { error: "releaseYear must be an integer" },
          { status: 400 },
        );
      }
      data.releaseYear = body.releaseYear as number;
    }

    if (Object.keys(data).length === 0) {
      return Response.json(
        { error: "Provide at least one field to update" },
        { status: 400 },
      );
    }

    const updatedMovie = await prisma.orm.public.Movie.where({ id: id }).update(
      data,
    );

    return Response.json(
      { message: "Movie updated successfully", updatedMovie },
      { status: 200 },
    );
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export default updateMovieHandler;
