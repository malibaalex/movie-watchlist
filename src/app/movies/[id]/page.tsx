/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  title: string;
  description: string | null;
  releaseYear: number | null;
  createdAt?: string;
};

const posterFor = (id: string) => `https://picsum.photos/seed/${id}/600/375`;

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Movie not found");
        if (!res.ok) throw new Error("Could not load the movie");
        return res.json();
      })
      .then(setMovie)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← Back to movies
        </Link>

        {loading && <p className="mt-8 text-zinc-500">Loading…</p>}
        {error && <p className="mt-8 text-red-400">{error}</p>}

        {movie && (
          <article className="mt-6">
            <img
              src={posterFor(movie.id)}
              alt={`${movie.title} poster`}
              className="aspect-16/10 w-full rounded-lg border border-zinc-800 bg-zinc-800 object-cover"
            />
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">
              {movie.title}
            </h1>
            {movie.releaseYear && (
              <p className="mt-1 text-zinc-500">{movie.releaseYear}</p>
            )}
            <p className="mt-6 leading-relaxed text-zinc-300">
              {movie.description ?? "No description available."}
            </p>
          </article>
        )}
      </div>
    </main>
  );
};

export default MovieDetailPage;
