import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies&&
    <div className="relative z-30 bg-black -mt-32 sm:-mt-40 md:-mt-52 lg:-mt-64 pb-20">
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MovieList title="Popular" movies={movies?.popularMovies} />
      <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
      <MovieList title="Upcoming" movies={movies?.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
