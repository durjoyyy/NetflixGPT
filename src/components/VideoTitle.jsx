import React, { useState } from "react";

const VideoTitle = ({ title, overview }) => {
  const [showMore, setShowMore] = useState(false);

  const shortOverview =
    overview && overview.length > 150 ? `${overview.substring(0, 150)}...` : overview;

  return (
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center">
      <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-32 px-4 sm:px-6 md:px-8 lg:px-16 max-w-2xl lg:max-w-3xl">
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-3 md:mb-4 line-clamp-3">
          {title}
        </h1>

        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6 w-full lg:w-3/4 line-clamp-2 md:line-clamp-3">
          {overview
            ? showMore
              ? overview
              : shortOverview
            : "No description available"}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          <button className="bg-white text-black px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-md text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:bg-gray-200 transition active:scale-95">
            Play
          </button>

          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-gray-500/70 text-white px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-md text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:bg-gray-500 transition active:scale-95"
          >
            {showMore ? "Less Info" : "More Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
