import { useMovies } from "../hooks";
import useTVShows from "../hooks/useTVShows";
import { DisplayMedias, MediaCarousel } from "../components";
import MediaHeader from "../components/MediaHeader";

const HomePage = () => {
  // Fetch movies data
  const {
    trendingMovies,
    popularMovies,
    nowPlayingMovies,
    upcommingMovies,
    topRatedMovies,
    isLoading: isLoadingMovies,
  } = useMovies();

  // Fetch TV shows data
  const {
    trendingTVShows,
    popularTVShows,
    airingTodayTVShows,
    onAirTVShows,
    topRatedTVShows,
    isLoading: isLoadingTVShows,
  } = useTVShows();

  // Handle loading state for both movies and TV shows
  if (isLoadingMovies || isLoadingTVShows) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
  }

  return (
    <section className="space-y-8">
      {/* Movies Section */}
      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Trending Movies"
          mediaType="movie"
          seemoreLink="/movies/trending?page=1"
        />
        <MediaCarousel
          labelledById="Trending-Movie"
          mediaType="movie"
          data={trendingMovies}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Popular Movies"
          mediaType="movie"
          seemoreLink="/movies/popular?page=1"
        />
        <DisplayMedias
          labelledById="Popular-Movie"
          mediaType="movie"
          data={popularMovies}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Now Playing"
          mediaType="movie"
          seemoreLink="/movies/now-playing?page=1"
        />
        <DisplayMedias
          labelledById="Now Playing-Movie"
          mediaType="movie"
          data={nowPlayingMovies}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Upcoming Movies"
          mediaType="movie"
          seemoreLink="/movies/upcomming?page=1"
        />
        <DisplayMedias
          labelledById="Upcoming-Movie"
          mediaType="movie"
          data={upcommingMovies}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Top Rated Movies"
          mediaType="movie"
          seemoreLink="/movies/top-rated?page=1"
        />
        <DisplayMedias
          labelledById="Top Rated-Movie"
          mediaType="movie"
          data={topRatedMovies}
        />
      </section>

      {/* TV Shows Section */}
      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Trending TV Shows"
          mediaType="tv"
          seemoreLink="/tv/trending?page=1"
        />
        <MediaCarousel
          labelledById="Trending-TV"
          mediaType="tv"
          data={trendingTVShows}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Popular TV Shows"
          mediaType="tv"
          seemoreLink="/tv/popular?page=1"
        />
        <DisplayMedias
          labelledById="Popular-TV"
          mediaType="tv"
          data={popularTVShows}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Airing Today"
          mediaType="tv"
          seemoreLink="/tv/airing-today?page=1"
        />
        <DisplayMedias
          labelledById="Airing-Today-TV"
          mediaType="tv"
          data={airingTodayTVShows}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="On Air TV Shows"
          mediaType="tv"
          seemoreLink="/tv/on-air?page=1"
        />
        <DisplayMedias
          labelledById="On-Air-TV"
          mediaType="tv"
          data={onAirTVShows}
        />
      </section>

      <section className="grid gap-8 2xl:space-y-0 md:gap-8.2 text-crispWhite">
        <MediaHeader
          label="Top Rated TV Shows"
          mediaType="tv"
          seemoreLink="/tv/top-rated?page=1"
        />
        <DisplayMedias
          labelledById="Top-Rated-TV"
          mediaType="tv"
          data={topRatedTVShows}
        />
      </section>
    </section>
  );
};

export default HomePage;
