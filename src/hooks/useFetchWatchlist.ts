import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { AccountDetails } from "../models/AccountDetails";
import { SearchResultPageData, Movie, TVShow } from "../models/SearchResult";
import { defaultFetchOptions } from "../utils/fetchOptions";

const useFetchWatchlist = (
  account: AccountDetails | null,
  sessionId: string | null
) => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const {
    data: movieWatchListData,
    isLoading: isLoadingMovieWatchList,
    refetch: refetchMovieWatchList,
    isError: isErrorLoadingMovieWatchlistData,
  } = useQuery({
    queryFn: async (): Promise<SearchResultPageData<Movie>> => {
      const url = `https://api.themoviedb.org/3/account/${account?.id}/watchlist/movies?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc`;

      try {
        const response = await fetch(url, defaultFetchOptions);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch movie watchlist. Status: ${response.status} - ${response.statusText}`
          );
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching movie watchlist:", error);
        throw new Error(
          "Unable to retrieve movie watchlist. Please try again later."
        );
      }
    },
    queryKey: ["movieWatchList", page],
    cacheTime: 1000 * 60 * 60 * 24,
    enabled: !!page && !!account && !!sessionId,
  });

  const {
    data: tvShowWatchListData,
    isLoading: isLoadingTvShowWatchList,
    refetch: refetchTvShowWatchList,
    isError: isErrorLoadingTvShowWatchListData,
  } = useQuery({
    queryFn: async (): Promise<SearchResultPageData<TVShow>> => {
      const url = `https://api.themoviedb.org/3/account/${account?.id}/watchlist/tv?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc`;

      try {
        const response = await fetch(url, defaultFetchOptions);
        if (!response.ok) {
          console.warn(
            `Failed to fetch TV show watchlist. Status: ${response.status} - ${response.statusText}`
          );
          // Return fallback data
          return { page: 1, results: [], total_pages: 0, total_results: 0 };
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching TV show watchlist:", error);
        // Return fallback data
        return { page: 1, results: [], total_pages: 0, total_results: 0 };
      }
    },
    queryKey: ["tvShowWatchList", page],
    cacheTime: 1000 * 60 * 60 * 24,
    enabled: !!page && !!account && !!sessionId,
  });

  const moviesWatchlistId =
    movieWatchListData?.results.reduce(
      (acc, movie) => ({ ...acc, [movie.id]: true }),
      {} as { [key: number]: boolean }
    ) ?? {};

  const tvShowWatchlistId =
    tvShowWatchListData?.results.reduce(
      (acc, tv) => ({ ...acc, [tv.id]: true }),
      {} as { [key: number]: boolean }
    ) ?? {};

  const watchlistId = { ...moviesWatchlistId, ...tvShowWatchlistId };

  return {
    movieWatchListData,
    tvShowWatchListData,
    isLoadingMovieWatchList,
    isLoadingTvShowWatchList,
    refetchMovieWatchList,
    refetchTvShowWatchList,
    watchlistId,
    isErrorLoadingMovieWatchlistData,
    isErrorLoadingTvShowWatchListData,
  };
};
export default useFetchWatchlist;
