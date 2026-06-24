import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = ({ movieId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideos = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS,
        );
        const json = await data.json();
        const videos = Array.isArray(json?.results) ? json.results : [];
        const trailer =
          videos.find((video) => video.type === "Trailer" && video.site === "YouTube") ||
          videos.find((video) => video.site === "YouTube") ||
          null;

        dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Failed to fetch movie trailer:", error);
        dispatch(addTrailerVideo(null));
      }
    };

    getMovieVideos();
  }, [dispatch, movieId]);
};

export default useMovieTrailer;
