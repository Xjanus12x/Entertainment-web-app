import rectangle from "../assets/images/Rectangle.svg";
const MovieCard = () => {
  return (
    <article
      className="bg-no-repeat min-w-60 min-h-33"
      style={{ backgroundImage: `url(${rectangle})` }}
    ></article>
  );
};

export default MovieCard;
