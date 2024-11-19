import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MediaDataResultPageData, Movie, TVShow } from "../models/SearchResult";
import { defaultFetchOptions } from "../utils/fetchOptions";

const useFetchMediasByGenre = (
  mediaType: string,
  genre: string,
  page: string
) => {
  const { id: genreId } = useParams();
  const { data, isLoading } = useQuery<MediaDataResultPageData<Movie | TVShow>>(
    {
      queryFn: async () => {
        const url = `https://api.themoviedb.org/3/discover/${mediaType}?with_genres=${genreId}&language=en-US&page=${page}`;
        const response = await fetch(url, defaultFetchOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch trending TV shows");
        }
        const result = await response.json();
        return result;
      },
      queryKey: ["moviesByGenre", page, genre],
      keepPreviousData: true,
      onError: (error) => console.error("Error fetching data:", error),
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  );

  return { data, isLoading };
};

export default useFetchMediasByGenre;
