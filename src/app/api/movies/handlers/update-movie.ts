import { badRequest, handle, json, notFound } from "@/lib/http";
import { prisma } from "@/lib/prisma";

interface UpdateMovieBody {
  title?: string;
  description?: string;
  releaseYear?: number;
}

const updateMovie = handle(
  "PATCH /api/movies/:id",
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const body = (await req.json()) as UpdateMovieBody;

    const data: UpdateMovieBody = {};

    if (body.title !== undefined) {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return badRequest("title must be a non-empty string");
      }
      data.title = body.title.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return badRequest("description must be a string");
      }
      data.description = body.description;
    }

    if (body.releaseYear !== undefined) {
      if (!Number.isInteger(body.releaseYear)) {
        return badRequest("releaseYear must be an integer");
      }
      data.releaseYear = body.releaseYear;
    }

    if (Object.keys(data).length === 0) {
      return badRequest("Provide at least one field to update");
    }

    const updatedMovie = await prisma.orm.public.Movie.where({ id }).update(
      data,
    );

    if (!updatedMovie) {
      return notFound("Movie not found");
    }

    return json(updatedMovie, 200);
  },
);

export default updateMovie;
