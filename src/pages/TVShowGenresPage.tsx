import { Link } from "react-router-dom";

const tvShowGenres = {
  genres: [
    {
      id: 10759,
      name: "Action & Adventure",
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
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

const TVShowGenresPage = () => {
  return (
    <section>
      <ul className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        {tvShowGenres?.genres.map(({ id, name }) => {
          return (
            <Link
              className="min-h-full text-center"
              to={`/tv/genre/${id}?name=${name}&page=1`}
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

export default TVShowGenresPage;
