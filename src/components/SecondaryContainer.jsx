import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <section className="relative z-20 -mt-24 bg-gradient-to-b from-transparent via-black via-12% to-black pb-16 pt-10 sm:-mt-32 md:-mt-44 lg:-mt-56">
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MovieList title="Popular" movies={movies?.popularMovies} />
      <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
      <MovieList title="Upcoming" movies={movies?.upcomingMovies} />
    </section>
  );
};

export default SecondaryContainer;
