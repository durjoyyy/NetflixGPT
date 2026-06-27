import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies=useSelector(store=>store.movies.popularMovies);

  useEffect(() => {
    if(popularMovies?.length) return;
    const getPopularMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS,
        );
        const json = await data.json();
        dispatch(addPopularMovies(Array.isArray(json?.results) ? json.results : []));
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        dispatch(addPopularMovies([]));
      }
    };

    getPopularMovies();
  }, [dispatch,popularMovies]);
};

export default usePopularMovies;
