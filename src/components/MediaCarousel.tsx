import { Link } from "react-router-dom";
import MediaCard from "./MediaCard";
import { Movie, TVShow } from "../models/SearchResult";
import { useTMDB } from "../context/TMDBProvider";
import { motion } from "framer-motion";
import {
  mediaCard,
  mediaCardsContainer,
} from "../animations/mediaCardAnimation";

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
      <motion.div
        className="flex space-x-4 lg:overflow-visible carousel carousel-center 2xl:space-x-10 2xl:px-0"
        aria-labelledby={labelledById}
        initial="hidden"
        variants={mediaCardsContainer}
        animate={data && data.length > 0 ? "show" : "hidden"}
      >
        {data?.map((item) => {
          const { id, backdrop_path } = item;
          const title = "name" in item ? item.name : item.title;
          const release_date = new Date(
            "first_air_date" in item ? item.first_air_date : item.release_date
          );

          return (
            <motion.div
              className="carousel-item sm:max-h-[14.375rem] min-h-33 w-full sm:max-w-[29.375rem]"
              key={id}
              variants={mediaCard}
            >
              <Link
                className=""
                to={`/${mediaType === "movie" ? "movies" : "tv"}/${id}`}
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
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default MediaCarousel;
