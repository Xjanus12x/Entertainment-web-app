import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Movie,
  SearchMulti,
  SearchResultPageData,
  TVShow,
} from "../models/SearchResult";
import { defaultFetchOptions } from "../utils/fetchOptions";

// Helper to get search type based on pathname
const getSearchType = (pathname: string) => {
  if (pathname.includes("movies")) return "movie";
  if (pathname.includes("tv")) return "tv";
  return "multi";
};

const useFetchSearchResults = (searchInput: string) => {
  const { pathname } = useLocation();
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const { data, isLoading } = useQuery({
    queryFn: async (): Promise<
      SearchResultPageData<Movie | TVShow | SearchMulti>
    > => {
      const searchType = getSearchType(location.pathname);
      const url = `https://api.themoviedb.org/3/search/${searchType}?query=${searchInput}&include_adult=false&language=en-US&page=${page}`;

      const response = await fetch(url, defaultFetchOptions);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      // Ensure the data is valid before returning it
      if (!data || !data.results) {
        return { page: 1, results: [], total_results: 0, total_pages: 0 };
      }

      return data;
    },
    queryKey: ["searchMoviesOrTVSeries", searchInput, pathname, page],
    enabled: !!searchInput,
    keepPreviousData: false,
  });
  return { data, isLoading };
};

export default useFetchSearchResults;
