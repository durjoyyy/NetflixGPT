import React, { useState } from "react";

const VideoTitle = ({ title, overview }) => {
  const [showMore, setShowMore] = useState(false);

  const shortOverview =
    overview && overview.length > 150 ? `${overview.substring(0, 150)}...` : overview;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center bg-gradient-to-r from-black via-black/70 to-transparent">
      <div className="max-w-3xl px-4 pt-16 sm:px-6 md:px-10 lg:px-14 lg:pt-24">
        <p className="mb-2 hidden text-xs font-semibold uppercase tracking-[0.28em] text-zinc-300 sm:block">
          Netflix Original
        </p>

        <h1 className="mb-3 max-w-2xl text-3xl font-black leading-none text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        <p
          className={`mb-5 max-w-xl text-sm font-medium leading-relaxed text-white drop-shadow md:mb-7 md:text-lg ${
            showMore ? "" : "line-clamp-3"
          }`}
        >
          {overview
            ? showMore
              ? overview
              : shortOverview
            : "No description available"}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded bg-white px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-black/30 transition hover:bg-zinc-200 active:scale-95 sm:px-8 sm:py-3 md:text-lg"
            type="button"
          >
            Play
          </button>

          <button
            onClick={() => setShowMore(!showMore)}
            className="rounded bg-zinc-500/75 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/30 backdrop-blur transition hover:bg-zinc-500 active:scale-95 sm:px-8 sm:py-3 md:text-lg"
            type="button"
          >
            {showMore ? "Less Info" : "More Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
