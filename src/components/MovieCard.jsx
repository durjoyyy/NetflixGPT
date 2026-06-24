import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <article className="group/card w-28 flex-none cursor-pointer sm:w-36 md:w-44 lg:w-48">
      <img
        className="aspect-[2/3] w-full rounded object-cover shadow-xl shadow-black/60 ring-1 ring-white/10 transition duration-300 group-hover/card:-translate-y-1 group-hover/card:scale-105 group-hover/card:ring-white/30"
        src={IMG_CDN_URL + posterPath}
        alt={title || "Movie Poster"}
        loading="lazy"
      />
    </article>
  );
};

export default MovieCard;
