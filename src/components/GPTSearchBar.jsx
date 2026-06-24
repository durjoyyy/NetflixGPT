import React from "react";
import lang from "../utils/language";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const selectedLang = useSelector((store) => store.config.lang);


  return (
    <div className="flex justify-center pt-40">
      <form className="w-full max-w-4xl flex">
        <input
          type="text"
          placeholder={lang[selectedLang].gptSeachPlaceholder}
          className="flex-1 px-6 py-4 bg-zinc-900 text-white border border-zinc-700 rounded-l-full outline-none focus:border-red-600"
        />
        <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-r-full transition">
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
