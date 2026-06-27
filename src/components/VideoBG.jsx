import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBG = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer({ movieId });

  if (!trailerVideo?.key) return null;

  const youtubeParams = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    loop: "1",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    playlist: trailerVideo.key,
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <iframe
        className="pointer-events-none absolute inset-0 h-full w-full min-h-full min-w-full"
        src={`https://www.youtube-nocookie.com/embed/${trailerVideo.key}?${youtubeParams.toString()}`}
        title="Movie trailer background"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
    </div>
  );
};

export default VideoBG;
