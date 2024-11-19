import { useQuery } from "@tanstack/react-query";
import { Movie } from "../models/SearchResult";
import {
  trendingMoviesPromise,
  popularMoviesPromise,
  nowPlayingMoviesPromise,
  upcommingMoviesPromise,
  topRatedMoviesPromise,
} from "../services/tmdbMovieApi";

const useMovies = () => {
  const { data: trendingMovies, isLoading: isLoadingTrendingMovies } = useQuery(
    {
      queryKey: ["trendingMovies"],
      queryFn: async (): Promise<Movie[]> => {
        const trendingMovies = await trendingMoviesPromise();
        return trendingMovies.results;
      },
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  );

  const { data: popularMovies, isLoading: isLoadingPopularMovies } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async (): Promise<Movie[]> => {
      const popularMovies = await popularMoviesPromise();
      return popularMovies.results.slice(0, 8);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const { data: nowPlayingMovies, isLoading: isLoadingNowPlayingMovies } =
    useQuery({
      queryKey: ["nowPlayingMovies"],
      queryFn: async (): Promise<Movie[]> => {
        const nowPlayingMovies = await nowPlayingMoviesPromise();
        return nowPlayingMovies.results.slice(0, 8);
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    });

  const { data: upcommingMovies, isLoading: isLoadingUpcommingMovies } =
    useQuery({
      queryKey: ["upcommingMovies"],
      queryFn: async (): Promise<Movie[]> => {
        const upcommingMovies = await upcommingMoviesPromise();
        return upcommingMovies.results.slice(0, 8);
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    });

  const { data: topRatedMovies, isLoading: isLoadingTopRatedMovies } = useQuery(
    {
      queryKey: ["topRatedMovies"],
      queryFn: async (): Promise<Movie[]> => {
        const topRatedMovies = await topRatedMoviesPromise();
        return topRatedMovies.results.slice(0, 8);
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  return {
    trendingMovies,
    popularMovies,
    nowPlayingMovies,
    upcommingMovies,
    topRatedMovies,
    isLoading:
      isLoadingTrendingMovies ||
      isLoadingPopularMovies ||
      isLoadingNowPlayingMovies ||
      isLoadingUpcommingMovies ||
      isLoadingTopRatedMovies,
  };
};

export default useMovies;
