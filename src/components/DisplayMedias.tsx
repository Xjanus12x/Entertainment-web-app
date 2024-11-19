import { Link, useLocation } from "react-router-dom";
import MediaCard from "./MediaCard";
import { Movie, TVShow } from "../models/SearchResult";
import { useTMDB } from "../context/TMDBProvider";

type DisplayMediasProps = {
  labelledById?: string;
  mediaType: "movie" | "tv";
  data?: Movie[] | TVShow[];
};

const DisplayMedias = ({
  labelledById,
  mediaType,
  data,
}: DisplayMediasProps) => {
  const isBookmarkPage = useLocation().pathname.includes("bookmarks");
  const { watchlistId } = useTMDB();
  
  return (  
    <section
      className="grid grid-cols-2 gap-3.6 md:grid-cols-3 2xl:grid-cols-4 2xl:gap-10"
      aria-labelledby={labelledById}
    >
      {data?.map((item) => {
        const { id, backdrop_path, poster_path } = item;

        const title = "name" in item ? item.name : item.title;
        const release_date = new Date(
          "first_air_date" in item ? item.first_air_date : item.release_date
        );

        
        return (
          <Link
            key={id}
            to={`/${mediaType === "movie" ? "movies" : "tv"}/${id}`}
          >
            <MediaCard
              isTrending={false}
              data={{
                id,
                title,
                release_date: new Date(release_date),
                mediaType: mediaType === "movie" ? "movie" : "tv series",
                thumbnail: backdrop_path || poster_path,
                isBookmarked: isBookmarkPage || watchlistId[id],
              }}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default DisplayMedias;
