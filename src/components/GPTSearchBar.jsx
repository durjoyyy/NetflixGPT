import React, { useRef } from "react";
import lang from "../utils/language";
import { useSelector } from "react-redux";
import openAI from "../utils/openAI";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const selectedLang = useSelector((store) => store.config.lang);
  const handleGPTSearchClick = async () => {
    //make an api call to openai and get the movie results
    // const response = await openAI.responses.create({
    //   model: "gpt-3.5-turbo",
    //   instructions:
    //     "You are a movie recommendation engine, just give me 5 movies, comma(,) separated like the example:Lootera, Barfi, Haider, 3 Idiots, Ludo",
    //   input: searchText.current.value,
    // });
    //console.log(response);
  };

  return (
    <div className="flex justify-center pt-40">
      <form
        className="w-full max-w-4xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[selectedLang].gptSeachPlaceholder}
          className="flex-1 px-6 py-4 bg-zinc-900 text-white border border-zinc-700 rounded-l-full outline-none focus:border-red-600"
        />
        <button
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold
         rounded-r-full transition"
          onClick={handleGPTSearchClick}
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
