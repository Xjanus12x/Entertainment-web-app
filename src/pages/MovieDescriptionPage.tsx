import { Link } from "react-router-dom";
import isValidDate from "../utils/isValidDate";
import StarRating from "../ui/StarRating";
import { useMediaDescription } from "../hooks";
import { MovieDetails } from "../models/MediaDetails";
import GoBackButton from "../ui/GoBackButton";

const MovieDescriptionPage = () => {
  const {
    mediaDetails,
    isLoadingDetails,
    mediaCastAndCrew,
    isLoadingCastAndCrew,
    mediaCastAndCrewError,
  } = useMediaDescription();

  if (isLoadingDetails || isLoadingCastAndCrew) {
    return (
      <span className="absolute -translate-x-1/2 -translate-y-1/2 loading loading-infinity loading-lg text-error top-1/2 left-1/2"></span>
    );
  }

  const {
    title,
    vote_average,
    spoken_languages,
    runtime,
    backdrop_path,
    poster_path,
    release_date,
    status,
    genres,
  } = mediaDetails as MovieDetails;

  const imageUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    : mediaDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : "https://via.placeholder.com/500x500/cccccc/000000?text=No+Image+Available&font-size=50"; // Custom text placeholder with larger font
  const safeYear =
    mediaDetails && isValidDate(release_date)
      ? new Date(release_date).getFullYear()
      : "N/A";

  return (
    <div className="space-y-2">
      <GoBackButton />
      <article className="gap-6 text-crispWhite md:grid md:grid-cols-2">
        <div>
          <img
            className="object-cover object-center w-full h-full"
            src={imageUrl}
            alt={title}
          />
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="font-semibold text-slateBlue">
              {mediaDetails?.tagline}
            </p>
            <div className="flex justify-center gap-2 md:justify-start">
              <p className="font-semibold text-crispWhite">
                {(vote_average / 2).toFixed(1)}
              </p>
              <StarRating voteAverage={vote_average} />
            </div>
          </div>
          <ul className="flex flex-wrap items-center justify-between text-center md:justify-start md:gap-10">
            <li>
              <p className="font-semibold text-slateBlue">Length</p>
              <p className="text-lg font-semibold">{runtime} min.</p>
            </li>
            <li>
              <p className="font-semibold text-slateBlue">Language</p>
              <p className="text-lg font-semibold">
                {spoken_languages.length > 0
                  ? spoken_languages.map(({ english_name }, index) => {
                      return (
                        <span key={index}>
                          {english_name}
                          {spoken_languages.length > 1 && index % 2 === 0
                            ? ","
                            : ""}
                        </span>
                      );
                    })
                  : "N/A"}
              </p>
            </li>
            <li>
              <p className="font-semibold text-slateBlue">Year</p>
              <p className="text-lg font-semibold">{safeYear}</p>
            </li>
            <li>
              <p className="font-semibold text-slateBlue">Status</p>
              <p className="text-lg font-semibold">{status}</p>
            </li>
          </ul>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slateBlue">Genres</h3>
            <ul className="flex flex-wrap gap-2">
              {genres.map(({ id, name }) => (
                <Link to={`/movies/genre/${id}?name=${name}&page=1`} key={id}>
                  <li className="px-2 py-1 text-sm font-semibold border rounded-full bg-crispWhite text-midnightBlue">
                    {name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slateBlue">Synopsis</h3>
            <p>{mediaDetails?.overview}</p>
          </div>
        </div>
        <div className="space-y-2 md:col-span-full">
          <h3 className="text-lg font-semibold text-slateBlue">Cast</h3>
          {mediaCastAndCrewError ? (
            <p className="text-crispWhite">N/A</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {mediaCastAndCrew?.cast.map((castMember, index) => (
                <li
                  className="px-2 py-1 text-sm border rounded-full border-crispWhite"
                  key={index}
                >
                  {castMember.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
};

export default MovieDescriptionPage;
