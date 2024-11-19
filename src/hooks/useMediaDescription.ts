import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  MediaCastAndCrew,
  MovieDetails,
  TVShowDetails,
} from "../models/MediaDetails";
import { defaultFetchOptions } from "../utils/fetchOptions";

const useMediaDescription = () => {
  const { id: mediaId } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.includes("movies") ? "movie" : "tv";
  // Fetch media details
  const {
    data: mediaDetails,
    error: mediaDetailsError,
    isLoading: isLoadingDetails,
  } = useQuery<MovieDetails | TVShowDetails>({
    queryFn: async () => {
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`;
      const response = await fetch(url, defaultFetchOptions);

      if (!response.ok) throw new Error("Failed to fetch media details");

      const result = await response.json();

      // Type assertion to handle the response correctly
      if (result.title) {
        return result as MovieDetails;
      } else if (result.name) {
        return result as TVShowDetails;
      } else {
        throw new Error("Invalid media type");
      }
    },
    queryKey: ["mediaDetails", , mediaType, mediaId], // Cache per media type
  });

  // Fetch cast and crew
  const {
    data: mediaCastAndCrew,
    error: mediaCastAndCrewError,
    isLoading: isLoadingCastAndCrew,
  } = useQuery<MediaCastAndCrew>({
    queryFn: async () => {
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?language=en-US`;
      const response = await fetch(url, defaultFetchOptions);

      if (!response.ok) throw new Error("Failed to fetch cast and crew");
      const result = await response.json();
      return result;
    },
    queryKey: ["mediaCastAndCrew", mediaType, mediaId], // Cache per media type
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    mediaDetails,
    mediaDetailsError,
    isLoadingDetails,
    mediaCastAndCrew,
    mediaCastAndCrewError,
    isLoadingCastAndCrew,
  };
};

export default useMediaDescription;
