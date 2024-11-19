import { useQuery } from "@tanstack/react-query";
import { Movie } from "../models/SearchResult";
import {
  trendingTVShowsPromise,
  popularTVShowsPromise,
  airingTodayTVShowsPromise,
  onAirTVShowsPromise,
  topRatedTVShowsPromise,
} from "../services/tmdbTvShowApi";

const useTVShows = () => {
  const { data: trendingTVShows, isLoading: isLoadingTrendingTVShows } =
    useQuery({
      queryKey: ["trendingTVShows"],
      queryFn: async (): Promise<Movie[]> => {
        const trending = await trendingTVShowsPromise();
        return trending.results;
      },
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    });

  const { data: popularTVShows, isLoading: isLoadingPopularTVShows } = useQuery(
    {
      queryKey: ["popularTVShows"],
      queryFn: async (): Promise<Movie[]> => {
        const popular = await popularTVShowsPromise();
        return popular.results.slice(0, 8); // Limit to 8 results
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const { data: airingTodayTVShows, isLoading: isLoadingAiringTodayTVShows } =
    useQuery({
      queryKey: ["airingTodayTVShows"],
      queryFn: async (): Promise<Movie[]> => {
        const airingToday = await airingTodayTVShowsPromise();
        return airingToday.results.slice(0, 8);
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    });

  const { data: onAirTVShows, isLoading: isLoadingOnAirTVShows } = useQuery({
    queryKey: ["onAirTVShows"],
    queryFn: async (): Promise<Movie[]> => {
      const onAir = await onAirTVShowsPromise();
      return onAir.results.slice(0, 8);
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const { data: topRatedTVShows, isLoading: isLoadingTopRatedTVShows } =
    useQuery({
      queryKey: ["topRatedTVShows"],
      queryFn: async (): Promise<Movie[]> => {
        const topRated = await topRatedTVShowsPromise();
        return topRated.results.slice(0, 8);
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    });

  return {
    trendingTVShows,
    popularTVShows,
    airingTodayTVShows,
    onAirTVShows,
    topRatedTVShows,
    isLoading:
      isLoadingTrendingTVShows ||
      isLoadingPopularTVShows ||
      isLoadingAiringTodayTVShows ||
      isLoadingOnAirTVShows ||
      isLoadingTopRatedTVShows,
  };
};

export default useTVShows;
