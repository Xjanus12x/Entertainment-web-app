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

// Utility to fetch search results
const fetchSearchResults = async (
  searchType: string,
  search: string,
  page: string
): Promise<SearchResultPageData<Movie | TVShow | SearchMulti>> => {
  const url = `https://api.themoviedb.org/3/search/${searchType}?query=${search}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(url, defaultFetchOptions);
  if (!response.ok) {
    console.warn("Failed to fetch data");
    return {
      page: 1,
      results: [],
      total_results: 0,
      total_pages: 0,
    };
  }
  return response.json();
};

const useFetchSearchResults = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const search = searchParams.get("query") ?? "";
  const page = searchParams.get("page") ?? "1";

  if (!search) {
    console.warn("Search query is empty");
    return { data: null, isLoading: false, search };
  }

  const searchType = getSearchType(pathname);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryFn: () => fetchSearchResults(searchType, search, page),
    queryKey: ["searchMoviesOrTVSeries", search, pathname, page],
    enabled: !!search,
    keepPreviousData: true,
  });

  return { data, isLoading, search, error, isError, refetch };
};

export default useFetchSearchResults;
