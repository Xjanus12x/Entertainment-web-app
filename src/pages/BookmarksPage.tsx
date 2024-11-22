import { DisplayMedias } from "../components";
import MediaHeader from "../components/MediaHeader";
import PaginationButtons from "../ui/PaginationButtons";
import { useTMDB } from "../context/TMDBProvider";

const BookmarksPage = () => {
  const {
    movieWatchListData,
    tvShowWatchListData,
    isLoadingMovieWatchList,
    isLoadingTvShowWatchList,
    isErrorLoadingMovieWatchlistData,
    isErrorLoadingTvShowWatchListData,
  } = useTMDB();

  if (isLoadingMovieWatchList || isLoadingTvShowWatchList) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
  }
  
  const hastMovieWatchList =
    movieWatchListData && movieWatchListData?.total_results > 0;
  const hasTvShowWatchList =
    tvShowWatchListData && tvShowWatchListData.total_results > 0;

  return (
    <section className="space-y-6 text-crispWhite">
      {hastMovieWatchList && (
        <section className="space-y-5">
          <MediaHeader label={"Movie Watchlist"}></MediaHeader>
          <DisplayMedias
            labelledById=""
            mediaType={"movie"}
            data={movieWatchListData.results}
          />
        </section>
      )}
      {hasTvShowWatchList && (
        <section className="space-y-5">
          <MediaHeader label={"TV Show Watchlist"}></MediaHeader>
          <DisplayMedias
            labelledById=""
            mediaType={"tv"}
            data={tvShowWatchListData.results}
          />
        </section>
      )}

      <PaginationButtons totalPages={movieWatchListData?.total_pages} />
    </section>
  );
};

export default BookmarksPage;
