import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBG from "./VideoBG";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[5];

  const { original_title, overview,id } = mainMovie;

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBG movieId={id}  />
    </div>
  );
};

export default MainContainer;
