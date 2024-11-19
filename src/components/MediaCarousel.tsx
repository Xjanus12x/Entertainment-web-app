import { Link, useLocation } from "react-router-dom";
import MediaCard from "./MediaCard";
import { Movie, TVShow } from "../models/SearchResult";
import { useTMDB } from "../context/TMDBProvider";

type MediaCarouselProps = {
  labelledById: string;
  mediaType: "movie" | "tv";
  data?: Movie[] | TVShow[];
};

const MediaCarousel = ({
  labelledById,
  mediaType,
  data,
}: MediaCarouselProps) => {
  const { watchlistId } = useTMDB();
  
  return (
    <section className="lg:overflow-auto">
      <div
        className="flex space-x-4 lg:overflow-visible carousel carousel-center 2xl:space-x-10 2xl:px-0"
        aria-labelledby={labelledById}
      >
        {data?.map((item) => {
          const { id, backdrop_path } = item;
          const title = "name" in item ? item.name : item.title;
          const release_date = new Date(
            "first_air_date" in item ? item.first_air_date : item.release_date
          );

          return (
            <Link
              className="min-h-33 sm:max-h-[14.375rem] carousel-item sm:w-full sm:max-w-[29.375rem] "
              to={`/${mediaType === "movie" ? "movies" : "tv"}/${id}`}
              key={id}
            >
              <MediaCard
                isTrending={true}
                data={{
                  id,
                  title,
                  release_date: new Date(release_date),
                  mediaType: "movie",
                  thumbnail: backdrop_path,
                  isBookmarked: watchlistId[id],
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MediaCarousel;
