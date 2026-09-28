import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const movies = await prisma.orm.public.Movie.all();
    return Response.json(movies);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
};

// Infer the row shape from the actual query, so the frontend and backend
// can never drift out of sync with each other or with the contract.
export type MoviesResponse = Awaited<
  ReturnType<typeof prisma.orm.public.Movie.all>
>;
export type Movie = MoviesResponse[number];
