import React, { useRef } from "react";
import lang from "../utils/language";
import { useDispatch, useSelector } from "react-redux";
import geminiClient from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const selectedLang = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();
    return json.results;
  };

  const handleGeminiSearch = async () => {
    const query = searchText.current?.value?.trim();
    console.log("Gemini Key:", process.env.REACT_APP_GEMINI_KEY);

    if (!query) return;

    try {
      const response = await geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents:
          query +
          " You are a movie recommendation engine.Give me exactly 5 movie titles separated by commas.Do not write anything else.",
      });
      const apiRes = response.text;
      const suggestedMovies = apiRes.split(",");
      const promiseArray = suggestedMovies.map((movie) =>
        searchMovieTMDB(movie),
      ); //returns an array of 5 promises
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGPTMovieResult({
          movieNames: suggestedMovies,
          movieResults: tmdbResults,
        }),
      );
    } catch (error) {
      console.error(error);
    }
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
          onClick={handleGeminiSearch}
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
