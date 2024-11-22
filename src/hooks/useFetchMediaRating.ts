import { useQuery } from "@tanstack/react-query";
import { defaultFetchOptions } from "../utils/fetchOptions";

const fetchMediaRating = async (mediaType: string, mediaId: number) => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/${
    mediaType === "movie" ? "release_dates" : "content_ratings"
  }`;

  try {
    const response = await fetch(url, defaultFetchOptions);

    // Check if the response is ok
    if (!response.ok) {
      let errorMessage = `Failed to fetch media rating. Status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Media not found. Please check the media type and ID.";
      } else if (response.status === 401) {
        errorMessage = "Unauthorized access. Check your API key.";
      } else if (response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }
      console.warn(errorMessage);
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
  } catch (error: any) {
    // Log the error to the console for debugging
    console.warn("Error fetching media rating:", error);

    // Optionally, return a fallback value or rethrow the error
    return "N/A";
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
