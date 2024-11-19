import { useQuery } from "@tanstack/react-query";
import {  useSearchParams } from "react-router-dom";
import { DisplayMedias } from "../components";
import { isMovieArray } from "../utils/isMovieArray";
import MediaHeader from "../components/MediaHeader";
import { MediaDataResultPageData, Movie, TVShow } from "../models/SearchResult";
import { defaultFetchOptions } from "../utils/fetchOptions";
import PaginationButtons from "../ui/PaginationButtons";
import GoBackButton from "../ui/GoBackButton";

type MediasPageProps = {
  mediaType: "movie" | "tv";
  label: string;
  url: string;
};

const MediasPage = ({ mediaType, label, url }: MediasPageProps) => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page") || "1"; // Get page from URL or default to 1
  const { data, isFetching } = useQuery<
    MediaDataResultPageData<Movie | TVShow>
  >({
    queryFn: async () => {
      const response = await fetch(`${url}&page=${page}`, defaultFetchOptions);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      return result;
    },
    queryKey: [mediaType, page, label, url], // Cache per media type
    keepPreviousData: true,
  });

  if (isFetching) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
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
