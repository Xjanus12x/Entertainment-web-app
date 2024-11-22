import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { DisplayMedias } from "../components";
import { isMovieArray } from "../utils/isMovieArray";
import MediaHeader from "../components/MediaHeader";
import { MediaDataResultPageData, Movie, TVShow } from "../models/SearchResult";
import { defaultFetchOptions } from "../utils/fetchOptions";
import PaginationButtons from "../ui/PaginationButtons";
import GoBackButton from "../ui/GoBackButton";
import DisplayError from "../components/DisplayError";

type MediasPageProps = {
  mediaType: "movie" | "tv";
  label: string;
  url: string;
};

const MediasPage = ({ mediaType, label, url }: MediasPageProps) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1"; // Get page from URL or default to 1

  const { data, isLoading, isError, error, refetch } = useQuery<
    MediaDataResultPageData<Movie | TVShow>
  >({
    queryFn: async () => {
      const response = await fetch(`${url}&page=${page}`, defaultFetchOptions);
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error fetching data:", errorDetails);
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
    queryKey: [mediaType, page, label], // Cache per media type and page
    keepPreviousData: true, // Retain old data while fetching new
    cacheTime: 60 * 60 * 1000, // 1 hour
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  if (isLoading) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
  }

  if (isError) {
    return <DisplayError error={error as Error} refetch={refetch} />;
  }

  const filteredData = data?.results
    ? isMovieArray(data.results)
      ? (data.results as Movie[])
      : (data.results as TVShow[])
    : undefined;

  return (
    <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
      <GoBackButton />
      <MediaHeader label={label} mediaType={mediaType} />
      <DisplayMedias
        labelledById={`${label}-${mediaType}`}
        mediaType={mediaType}
        data={filteredData}
      />
      <PaginationButtons totalPages={data?.total_pages} />
    </section>
  );
};

export default MediasPage;
