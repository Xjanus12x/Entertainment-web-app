import { Link } from "react-router-dom";

const movieGenres = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

const MovieGenresPage = () => {
  return (
    <section>
      <ul className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 2xl:grid-cols-5">
        {movieGenres?.genres.map(({ id, name }) => {
          return (
            <Link
              className="min-h-full text-center"
              to={`/movies/genre/${id}?name=${name}&page=1`}
              key={id}
            >
              <li className="p-4 md:p-9 rounded-md bg-[#2C2C2E] hover:bg-[#3A3A3C] cursor-pointer h-full font-bold text-crispWhite">
                {name}
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default MovieGenresPage;
