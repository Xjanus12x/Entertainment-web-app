import movieIcon from "../assets/images/icons/Movie.svg";
import gridIcon from "../assets/images/icons/Grid.svg";
import filmIcon from "../assets/images/icons/Film.svg";
import tvIcon from "../assets/images/icons/TV.svg";
import bookmarkIcon from "../assets/images/icons/Bookmark.svg";
import avatarIcon from "../assets/images/icons/Oval.svg";

const AdaptiveNavBar = () => {
  return (
    <nav aria-label="Main navigation" className="p-6 bg-deepNavy">
      <ul className="flex items-center gap-6">
        <li className="inline-flex">
          <button aria-label="Movies">
            <img src={movieIcon} alt="" aria-hidden="true" />
          </button>
        </li>
        <li className="inline-flex ml-auto">
          <button aria-label="Dashboard">
            <img src={gridIcon} alt="" aria-hidden="true" />
          </button>
        </li>
        <li className="inline-flex">
          <button aria-label="Films">
            <img src={filmIcon} alt="" aria-hidden="true" />
          </button>
        </li>
        <li className="inline-flex">
          <button aria-label="TV Shows">
            <img src={tvIcon} alt="" aria-hidden="true" />
          </button>
        </li>
        <li className="inline-flex mr-auto">
          <button aria-label="Bookmarks">
            <img src={bookmarkIcon} alt="" aria-hidden="true" />
          </button>
        </li>
        <li className="inline-flex">
          <img src={avatarIcon} alt="User avatar" className="rounded-full" />
        </li>
      </ul>
    </nav>
  );
};

export default AdaptiveNavBar;
