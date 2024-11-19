import { useQuery } from "@tanstack/react-query";
import { defaultFetchOptions } from "../utils/fetchOptions";

const fetchMediaRating = async (mediaType: string, mediaId: number) => {
  // Construct the URL based on media type (movie or TV)
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/${
    mediaType === "movie" ? "release_dates" : "content_ratings"
  }`;

  const response = await fetch(url, defaultFetchOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch media rating");
  }

  const data = await response.json();

  // Extract the US rating if available
  if (mediaType === "movie") {
    const usRelease = data.results?.find(
      (release: any) => release.iso_3166_1 === "US"
    );
    return usRelease?.release_dates[0]?.certification || "Not Rated";
  } else {
    const usRating = data.results?.find(
      (rating: any) => rating.iso_3166_1 === "US"
    );

    return usRating?.rating || "Not Rated";
  }
};

// Custom hook for fetching media rating
const useMediaRating = (mediaType: string, mediaId: number) => {
  return useQuery({
    queryKey: ["mediaRating", mediaType, mediaId],
    queryFn: () => fetchMediaRating(mediaType, mediaId),
    enabled: !!mediaId && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useMediaRating;
