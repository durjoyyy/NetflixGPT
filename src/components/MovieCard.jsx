import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-52 transition duration-300 hover:scale-110 cursor-pointer">
      <img
        className="rounded-md w-full h-auto object-cover shadow-lg"
        src={IMG_CDN_URL + posterPath}
        alt="Movie Poster"
      />
    </div>
  );
};

export default MovieCard;