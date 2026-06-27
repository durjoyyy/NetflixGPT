import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  console.log(movieNames, movieResults);

  if (!movieNames || !movieResults) return null;

  return (
    <div>
      {movieNames.map((movie,index) => (
        <MovieList key={movie} title={movie} movies={movieResults[index]} />
      ))}
    </div>
  );
};

export default GPTMovieSuggestions;
