import { useSearchParams } from "react-router-dom";
import { DisplayMedias } from "../components";
import { isMovieArray } from "../utils/isMovieArray";
import { Movie, TVShow } from "../models/SearchResult";
import { useFetchMediasByGenre } from "../hooks";
import GoBackButton from "../ui/GoBackButton";
import PaginationButtons from "../ui/PaginationButtons";

type MediasByGenre = {
  mediaType: "movie" | "tv";
};
const MediasByGenre = ({ mediaType }: MediasByGenre) => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const genre = searchParams.get("name") ?? "";
  const { data, isLoading } = useFetchMediasByGenre(mediaType, genre, page);

  if (isLoading) {
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
      <DisplayMedias mediaType={mediaType} data={filteredData} />
      <PaginationButtons totalPages={data?.total_pages} />
    </section>
  );
};
export default MediasByGenre;
