import deleteMovie from "../handlers/delete-movie";
import getMovie from "../handlers/get-movie";
import updateMovie from "../handlers/update-movie";

export const GET = getMovie;
export const POST = updateMovie;
export const DELETE = deleteMovie;
