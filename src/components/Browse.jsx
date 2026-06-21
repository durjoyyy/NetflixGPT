import Header from "./Header";
import useNowPlayingMovies  from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";


const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
      {
        /*
        Main Container
          -video bg
          -video title
        Second Container
          -movie list * n
          -cards * n
        */
      }
    </div>
  );
};

export default Browse;
