import { useQuery } from "@tanstack/react-query";
import { Movie, SearchResultPageData, TVShow } from "../models/SearchResult";
import { defaultFetchOptions } from "../utils/fetchOptions";
import { AccountDetails } from "../models/AccountDetails";
import { useSearchParams } from "react-router-dom";

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
  } = useQuery({
    queryFn: async (): Promise<SearchResultPageData<Movie>> => {
      const url = `https://api.themoviedb.org/3/account/${account?.id}/watchlist/movies?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`;

      try {
        const response = await fetch(url, defaultFetchOptions);

        // Check if the response is not OK and handle the error with more context
        if (!response.ok) {
          throw new Error(
            `Failed to fetch movie watchlist. Status: ${response.status} ${response.statusText}. Please verify your session ID and account details.`
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching movie watchlist:", error);
        throw new Error(
          "Unable to retrieve movie watchlist. Please try again later."
        );
      }
    },
    queryKey: ["movieWatchList", page],
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!page && !!account && !!sessionId,
  });

  const {
    data: tvShowWatchListData,
    isLoading: isLoadingTvShowWatchList,
    refetch: refetchTvShowWatchList,
  } = useQuery({
    queryFn: async (): Promise<SearchResultPageData<TVShow>> => {
      const url = `https://api.themoviedb.org/3/account/${account?.id}/watchlist/tv?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`;

      const response = await fetch(url, defaultFetchOptions);

      // Handle errors with a more informative message
      if (!response.ok) {
        const errorMessage = `Failed to fetch TV show watchlist. Status: ${response.status} ${response.statusText}. Please check your session ID or account details.`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    },
    queryKey: ["tvShowWatchList", page],
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!page && !!account && !!sessionId,
  });

  // Create an object with movie IDs as keys and boolean values
  const moviesWatchlistId =
    movieWatchListData?.results.reduce(
      (acc, movie) => ({ ...acc, [movie.id]: true }),
      {} as { [key: number]: boolean }
    ) ?? {};

  // Create an object with TV show IDs as keys and boolean values
  const tvShowWatchlistId =
    tvShowWatchListData?.results.reduce(
      (acc, tv) => ({ ...acc, [tv.id]: true }),
      {} as { [key: number]: boolean }
    ) ?? {};

  // Merge the two objects into a single watchlistId object
  const watchlistId = { ...moviesWatchlistId, ...tvShowWatchlistId };
  return {
    movieWatchListData,
    tvShowWatchListData,
    isLoadingMovieWatchList,
    isLoadingTvShowWatchList,
    refetchMovieWatchList,
    refetchTvShowWatchList,
    watchlistId,
  };
};

export default useFetchWatchlist;
