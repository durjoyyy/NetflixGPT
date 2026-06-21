import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  if (!movies) return null;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12 mb-6 md:mb-8">
      <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 px-2 md:px-0">
        {title}
      </h1>

      <div className="group relative w-full">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-600 hover:bg-gray-700 text-white p-2 md:p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          ◀
        </button>

        {/* Movie Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-hidden overflow-y-hidden scroll-smooth w-full"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-600 hover:bg-gray-700 text-white p-2 md:p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default MovieList;