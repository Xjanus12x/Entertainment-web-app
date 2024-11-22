import { DisplayMedias } from "../components";
import MediaHeader from "../components/MediaHeader";
import PaginationButtons from "../ui/PaginationButtons";
import { useTMDB } from "../context/TMDBProvider";
import DisplayError from "../components/DisplayError";

const BookmarksPage = () => {
  const {
    movieWatchListData,
    tvShowWatchListData,
    isLoadingMovieWatchList,
    isLoadingTvShowWatchList,
    isErrorLoadingMovieWatchlistData,
    isErrorLoadingTvShowWatchListData,
    errorMovieWatchlist,
    errorTvShowWatchList,
    refetchMovieWatchList,
    refetchTvShowWatchList,
  } = useTMDB();

  if (isLoadingMovieWatchList || isLoadingTvShowWatchList) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
  }
  if (isErrorLoadingMovieWatchlistData) {
    return (
      <DisplayError
        error={errorMovieWatchlist as Error}
        refetch={refetchMovieWatchList}
      />
    );
  } else if (isErrorLoadingTvShowWatchListData) {
    return (
      <DisplayError
        error={errorTvShowWatchList as Error}
        refetch={refetchTvShowWatchList}
      />
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
          <MediaHeader label="Movie Watchlist" mediaType="movie"></MediaHeader>
          <DisplayMedias
            labelledById="Movie Watchlist-movie"
            mediaType="movie"
            data={movieWatchListData.results}
          />
        </section>
      )}

      {hasTvShowWatchList && (
        <section className="space-y-5">
          <MediaHeader label="TV Show Watchlist" mediaType="tv"></MediaHeader>
          <DisplayMedias
            labelledById="TV Show Watchlist-tv"
            mediaType="tv"
            data={tvShowWatchListData.results}
          />
        </section>
      )}

      <PaginationButtons totalPages={movieWatchListData?.total_pages} />
    </section>
  );
};

export default BookmarksPage;
