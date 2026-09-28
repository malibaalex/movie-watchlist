// "use client";

// import { useEffect, useState } from "react";
// import type { Movie } from "@/app/api/movies/route";
// import Image from "next/image";

// const Page = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("/api/movies");

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result: Movie[] = await response.json();
//       setMovies(result);
//     } catch (error) {
//       console.error({ error });
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchData();
//   }, []);

//   return (
//     <div className="grid grid-cols-5 gap-3">
//       {movies.map((movie) => (
//         <article
//           key={movie.id}
//           className="group flex flex-col overflow-hidden rounded-md border border-neutral-200 bg-white transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
//         >
//           <div className="relative aspect-2/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
//             <Image
//               src={`https://picsum.photos/seed/${movie.id}/300/450`}
//               alt=""
//               aria-hidden="true"
//               className="h-full w-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0" />
//             {movie.releaseYear && (
//               <span className="absolute bottom-2 left-2 font-mono text-xs text-white/80">
//                 {movie.releaseYear}
//               </span>
//             )}
//           </div>

//           <div className="flex flex-1 flex-col gap-1 p-2">
//             <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-neutral-900 dark:text-neutral-50">
//               {movie.title}
//             </h3>
//           </div>
//         </article>
//       ))}
//     </div>
//   );
// };

// export default Page;
