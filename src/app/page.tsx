/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  title: string;
  description: string | null;
  releaseYear: number | null;
};

// The schema has no image column, so posters are placeholders seeded by movie id.
// When you add a posterUrl field, swap this for m.posterUrl.
const posterFor = (id: string) => `https://picsum.photos/seed/${id}/400/250`;

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load movies");
        return res.json();
      })
      .then(setMovies)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">Movies</h1>

        {error && <p className="text-red-400">{error}</p>}

        {loading ? (
          <p className="text-zinc-500">Loading…</p>
        ) : movies.length === 0 ? (
          <p className="text-zinc-500">No movies yet.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {movies.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/movies/${m.id}`}
                  className="block overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition hover:border-zinc-600"
                >
                  <img
                    src={posterFor(m.id)}
                    alt={`${m.title} poster`}
                    loading="lazy"
                    className="aspect-16/10 w-full bg-zinc-800 object-cover"
                  />
                  <div className="p-3">
                    <h2 className="font-medium leading-snug">{m.title}</h2>
                    {m.releaseYear && (
                      <p className="text-sm text-zinc-500">{m.releaseYear}</p>
                    )}
                    {m.description && (
                      <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                        {m.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default MoviesPage;
