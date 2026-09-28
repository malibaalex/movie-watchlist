import createMovie from "./handlers/create-movie";
import { getMovies } from "./handlers/get-movies";

export const POST = createMovie;
export const GET = getMovies;
