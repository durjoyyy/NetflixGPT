import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);
  const visibleMovies = movies?.filter((movie) => movie?.poster_path) || [];

  if (!visibleMovies.length) return null;

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-7 md:mb-10">
      <h2 className="mb-3 px-4 text-lg font-bold text-white sm:px-6 sm:text-xl md:px-10 md:text-2xl lg:px-14">
        {title}
      </h2>

      <div className="group relative w-full">
        <button
          aria-label={`Scroll ${title} left`}
          className="absolute left-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-r from-black via-black/80 to-transparent text-3xl font-light text-white opacity-0 transition duration-200 hover:text-zinc-300 group-hover:opacity-100 md:flex lg:w-14"
          onClick={() => scroll("left")}
          type="button"
        >
          &lt;
        </button>

        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex w-full gap-2 overflow-x-auto overflow-y-hidden scroll-smooth px-4 pb-3 pt-1 sm:gap-3 sm:px-6 md:gap-4 md:px-10 lg:px-14"
        >
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title || movie.original_title}
            />
          ))}
        </div>

        <button
          aria-label={`Scroll ${title} right`}
          className="absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-black via-black/80 to-transparent text-3xl font-light text-white opacity-0 transition duration-200 hover:text-zinc-300 group-hover:opacity-100 md:flex lg:w-14"
          onClick={() => scroll("right")}
          type="button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
