import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = ({movieId}) => {
  const dispatch = useDispatch();

  //fetch trailer video and updating the store with trailer video store
  useEffect(() => {
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
        API_OPTIONS,
      );
      const json = await data.json();
      const filteredData = json.results.filter(
        (video) => video.type === "Trailer",
      );
      const trailer = filteredData.length ? filteredData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    };

    getMovieVideos();
  }, [dispatch,movieId]);
};

export default useMovieTrailer;
