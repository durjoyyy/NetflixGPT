import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      if (nowPlayingMovies && nowPlayingMovies.length > 0) return;
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS,
        );
        const json = await data.json();
        dispatch(
          addNowPlayingMovies(Array.isArray(json?.results) ? json.results : []),
        );
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
        dispatch(addNowPlayingMovies([]));
      }
    };

    getNowPlayingMovies();
  }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;
