import movieIcon from "../assets/images/icons/Movie.svg";
import { Link, NavLink } from "react-router-dom";
import { BookMarkIcon, FilmIcon, GridIcon, TVIcon } from "../icons";
import { useTMDB } from "../context/TMDBProvider";
import { useEffect } from "react";
const isActive = ({ isActive }: { isActive: boolean }) =>
  `transition-transform duration-300 ${
    isActive ? "text-crispWhite scale-150" : "text-slateBlue"
  }`;
const AdaptiveNavBar = () => {
  const { accountData } = useTMDB();
  // Construct the avatar URL
  const avatarUrl = accountData?.avatar?.tmdb?.avatar_path
    ? `https://image.tmdb.org/t/p/w500${accountData.avatar.tmdb.avatar_path}`
    : accountData?.avatar?.gravatar?.hash
    ? `https://www.gravatar.com/avatar/${accountData.avatar.gravatar.hash}?s=200`
    : "/path/to/default/avatar.png"; // Fallback image if no avatar

  return (
    <nav
      aria-label="Main navigation"
      className="sticky 4 top-0 z-50 p-6 md:p-8 bg-deepNavy 2xl:fixed md:max-h-[50rem] md:rounded-lg 2xl:bottom-1/4 2xl:top-8 2xl:left-8 2xl:rounded-2xl"
    >
      <ul className="sticky top-0 flex items-center gap-6 md:h-full md:flex-col md:gap-10">
        <li className="inline-flex">
          <Link to="/" aria-label="Go to homepage">
            <img src={movieIcon} aria-hidden="true" />
          </Link>
        </li>
        <li className="inline-flex ml-auto md:ml-0 md:mt-auto">
          <NavLink
            to="/"
            className={isActive}
            aria-label="Browse movies and Tv Series"
          >
            <GridIcon />
          </NavLink>
        </li>

        <li className="inline-flex">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `transition-transform duration-300 ${
                isActive ? "text-crispWhite scale-150" : "text-slateBlue"
              }`
            }
            aria-label="Browse Movies"
          >
            <FilmIcon />
          </NavLink>
        </li>
        <li className="inline-flex">
          <NavLink to="/tv" className={isActive} aria-label="Browse TV series">
            <TVIcon />
          </NavLink>
        </li>
        <li className="inline-flex mr-auto md:mr-0 md:mb-auto">
          <NavLink
            to="/bookmarks?page=1"
            className={isActive}
            aria-label="View bookmarked items"
          >
            <BookMarkIcon isBookmarked={true} />
          </NavLink>
        </li>
        <li className="inline-flex">
          <img
            className="object-cover object-center rounded-full size-10"
            src={avatarUrl}
            alt="User avatar"
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdaptiveNavBar;
