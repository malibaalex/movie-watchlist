import { NextResponse } from "next/server";

export const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

export const badRequest = (message: string) => json({ error: message }, 400);

export const notFound = (what: string) =>
  json({ error: `${what} not found` }, 404);

export const serverError = (label: string, error: unknown) => {
  console.error(`${label} failed:`, error);
  return json({ error: "Internal server error" }, 500);
};

/** Parses a JSON object body; returns null if it's missing or malformed. */
export const readBody = async (
  req: Request,
): Promise<Record<string, unknown> | null> => {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? body : null;
  } catch {
    return null;
  }
};
