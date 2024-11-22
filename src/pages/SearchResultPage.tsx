import { Link } from "react-router-dom";
import { MediaCard } from "../components";
import isValidDate from "../utils/isValidDate";
import useFetchSearchResults from "../hooks/useFetchSearchResults";
import PaginationButtons from "../ui/PaginationButtons";
import GoBackButton from "../ui/GoBackButton";
import { motion } from "framer-motion";
import {
  mediaCard,
  mediaCardsContainer,
} from "../animations/mediaCardAnimation";
import DisplayError from "../components/DisplayError";

const SearchResultPage = () => {
  const {
    data: searchResults,
    isLoading,
    search,
    error,
    isError,
    refetch,
  } = useFetchSearchResults();

  if (isLoading) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
  }
  if (isError) {
    return <DisplayError error={error as Error} refetch={refetch} />;
  }
  return (
    <>
      <GoBackButton redirectPath="/" />

      {searchResults && (
        <p className="px-4 text-xl text-white">
          Found {searchResults?.total_results ?? 0} result for '{search}'
        </p>
      )}

      <motion.section
        className="grid grid-cols-2 gap-3.6 md:grid-cols-3 2xl:grid-cols-4 2xl:gap-10"
        initial="hidden"
        variants={mediaCardsContainer}
        animate={
          searchResults && searchResults.total_results > 0 ? "show" : "hidden"
        }
      >
        {searchResults?.results?.map((item) => {
          const { id } = item;
          const title = "title" in item ? item.title : item.name;
          const releaseDate =
            "first_air_date" in item ? item.first_air_date : item.release_date;
          const thumbnail = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null;
          const mediaType = "title" in item ? "movie" : "tv";
          return (
            <motion.div variants={mediaCard} key={id}>
              <Link to={`/${mediaType === "movie" ? "movies" : "tv"}/${id}`}>
                <MediaCard
                  isTrending={false}
                  data={{
                    id,
                    title,
                    release_date:
                      releaseDate && isValidDate(new Date(releaseDate))
                        ? new Date(releaseDate)
                        : null,
                    mediaType: mediaType === "movie" ? "movie" : "tv series",
                    rating: "",
                    thumbnail,
                    isBookmarked: false, // Set this based on your bookmarking logic
                  }}
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.section>
      <PaginationButtons totalPages={searchResults?.total_pages} />
    </>
  );
};

export default SearchResultPage;
