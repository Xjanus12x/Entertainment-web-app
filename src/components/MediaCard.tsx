import { useState } from "react";
import { useModal, useNotifitcation } from "../context/ModalProvider";
import { useTMDB } from "../context/TMDBProvider";
import useMediaRating from "../hooks/useFetchMediaRating";
import { BookMarkIcon, FilmIcon, TVIcon } from "../icons";
import isValidDate from "../utils/isValidDate";
type MediaCardProps = {
  isTrending: boolean;
  data: {
    id: number;
    title: string;
    release_date: Date | null;
    mediaType: "movie" | "tv series";
    rating?: string;
    thumbnail?: string | null;
    isBookmarked: boolean;
  };
};

const addToWatchlist = async (
  sessionId: string,
  accountId: string,
  mediaType: "movie" | "tv",
  mediaId: number,
  watchlist: boolean
) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_type: mediaType,
        media_id: mediaId,
        watchlist,
      }),
    }
  );
  const data = await response.json();
  return data;
};

const MediaCard = ({
  isTrending,
  data: { id, title, release_date, mediaType, thumbnail, isBookmarked },
}: MediaCardProps) => {
  const [isWatchlist, setIsWatchlist] = useState(!!isBookmarked);
  const type = mediaType === "movie" ? "movie" : "tv";

  const { data: mediaRating } = useMediaRating(type, id);

  const { setIsOpen, setModal } = useModal();
  const { addNotification } = useNotifitcation();
  const {
    accountData,
    sessionId,
    refetchMovieWatchList,
    refetchTvShowWatchList,
  } = useTMDB();

  const safeYear =
    release_date && isValidDate(release_date)
      ? new Date(release_date).getFullYear()
      : "N/A";
  const imageUrl = thumbnail
    ? `https://image.tmdb.org/t/p/w500/${thumbnail}`
    : "https://via.placeholder.com/500x750/cccccc/000000?text=No+Image+Available&font-size=50"; // Custom text placeholder with larger font

  return (
    <article className="relative w-full max-h-full">
      <img
        className={`object-cover object-center rounded-[8px] min-w-full brightness-50 ${
          isTrending ? "h-full" : "max-h-[10.875rem]"
        }`}
        src={imageUrl}
        aria-hidden
        alt={title}
      />

      <button
        className={`absolute grid bg-opacity-50 rounded-full right-2 top-2 bg-midnightBlue size-8 place-content-center sm:top-4 ${
          isTrending ? "sm:right-6" : "sm:right-4"
        }`}
        type="button"
        aria-label="Add to bookmark"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from bubbling up to the Link
          e.preventDefault();
          if (accountData) {
            (async () => {
              const type = mediaType === "movie" ? "movie" : "tv";

              const { success } = (await addToWatchlist(
                sessionId!,
                accountData.id.toString(),
                type,
                id, // Replace with actual movie/TV ID
                !isWatchlist // true to add, false to remove
              )) as {
                status_code: number;
                status_message: string;
                success: boolean;
              };
              if (success) {
                if (mediaType === "tv series") {
                  refetchTvShowWatchList();
                }
                if (mediaType === "movie") {
                  refetchMovieWatchList();
                }

                if (isWatchlist) {
                  const message =
                    "✅ The media has been successfully removed from your watchlist. If you change your mind, you can always add it back anytime!";
                  addNotification(message);
                  setIsWatchlist(false);
                } else {
                  const message = `The ${
                    type === "movie" ? "movie" : "TV show"
                  } ${title} has been successfully added to your watchlist!`;
                  message;
                  addNotification(message);
                  setIsWatchlist(true);
                }
              } else {
                const message =
                  "Oops! We couldn't add this item to your watchlist. Please check your internet connection or try logging in again to refresh your session.";
                addNotification(message);
              }
            })();
          } else {
            setIsOpen(true);
            setModal({
              header: "Login Required",
              body: "Please log in to your TMDB account to bookmark this media. Access approval is needed to save your favorite content.",
            });
          }
        }}
      >
        <BookMarkIcon isBookmarked={isWatchlist} />
      </button>
      <footer
        className={`text-crispWhite ${
          isTrending ? "absolute bottom-0 left-0 p-4 sm:p-6" : "pt-[0.625rem]"
        }`}
      >
        <ul
          className={`flex items-center gap-2.1 opacity-75 flex-wrap ${
            isTrending
              ? "text-xs sm:text-[0.938rem]"
              : "text-[0.688rem] sm:text-[0.813rem]"
          }`}
        >
          <li>{safeYear}</li>
          <li
            className="size-[3px] rounded-full bg-crispWhite bg-opacity-75"
            aria-hidden={true}
          ></li>
          <li className="inline-flex gap-1.5">
            {mediaType === "movie" ? <FilmIcon /> : <TVIcon />}
            {mediaType}
          </li>
          <li
            className="size-[3px] rounded-full bg-crispWhite bg-opacity-75"
            aria-hidden={true}
          ></li>
          <li>{mediaRating}</li>
        </ul>
        <h3
          className={`${
            isTrending
              ? "text-[0.938rem] sm:text-2xl"
              : "text-[0.875rem] sm:text-lg"
          }`}
        >
          {title}
        </h3>
      </footer>
    </article>
  );
};

export default MediaCard;
