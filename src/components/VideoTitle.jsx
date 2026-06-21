import React, { useState } from "react";

const VideoTitle = ({ title, overview }) => {
  const [showMore, setShowMore] = useState(false);

  const shortOverview =
    overview && overview.length > 150 ? `${overview.substring(0, 150)}...` : overview;

  return (
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/70 to-transparent">
      <div className="pt-24 md:pt-36 lg:pt-56 px-4 md:px-8 lg:px-16 max-w-3xl">
        <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold drop-shadow-lg mb-4 md:mb-6">
          {title}
        </h1>

        <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 w-full md:w-3/4">
          {overview
            ? showMore
              ? overview
              : shortOverview
            : "No description available"}
        </p>

        <div className="flex flex-wrap gap-3 md:gap-4">
          <button className="bg-white text-black px-4 md:px-7 py-2 md:py-3 rounded-md text-sm md:text-lg font-bold hover:bg-gray-200 transition">
            Play
          </button>

          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-gray-500/70 text-white px-4 md:px-7 py-2 md:py-3 rounded-md text-sm md:text-lg font-bold hover:bg-gray-500 transition"
          >
            {showMore ? "Less Info" : "More Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
