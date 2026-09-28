import { NextResponse } from "next/server";

export const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

export const notFound = (what: string) =>
  json({ error: `${what} not found` }, 404);

/** Wraps a route handler so unexpected errors become a 500. */
export const handle =
  <A extends unknown[]>(label: string, fn: (...args: A) => Promise<Response>) =>
  async (...args: A) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(`${label} failed:`, error);
      return json({ error: "Internal server error" }, 500);
    }
  };
