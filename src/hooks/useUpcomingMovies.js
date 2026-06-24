import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?page=1",
          API_OPTIONS,
        );
        const json = await data.json();
        dispatch(addUpcomingMovies(Array.isArray(json?.results) ? json.results : []));
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
        dispatch(addUpcomingMovies([]));
      }
    };

    getUpcomingMovies();
  }, [dispatch]);
};

export default useUpcomingMovies;
