import deleteMovieHandler from "../handlers/delete-movie";
import getMovieHandler from "../handlers/get-movie";
import updateMovieHandler from "../handlers/update-movie";

export const GET = getMovieHandler;
export const POST = updateMovieHandler;
export const DELETE = deleteMovieHandler;
