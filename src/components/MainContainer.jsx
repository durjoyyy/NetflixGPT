import React from "react";
import { useSelector } from "react-redux";
import VideoBG from "./VideoBG";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies?.length) {
    return <div className="h-[70vh] bg-black" />;
  }

  const mainMovie = movies.find((movie) => movie?.id && movie?.overview) || movies[0];

  if (!mainMovie) {
    return <div className="h-[70vh] bg-black" />;
  }

  const { id, original_title, overview, title } = mainMovie;

  return (
    <main className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-black sm:h-[78vh] md:h-screen">
      <VideoTitle title={title || original_title} overview={overview} />
      <VideoBG movieId={id} />
    </main>
  );
};

export default MainContainer;
