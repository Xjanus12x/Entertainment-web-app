import data from "../assets/data/TrendingMovies";
import { MediaCard } from "../components";

const Carousel = () => {
  return (
    <div className="w-full max-w-md px-4 space-x-4 min-h-33 carousel carousel-center">
      {data.trending.map((media) => {
        return (
          <div className="carousel-item" key={media.id}>
            <MediaCard
              thumbNailHeight="min-w-60"
              thumbNailWidth="max-h-33"
              isTrending={true}
              data={media}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
