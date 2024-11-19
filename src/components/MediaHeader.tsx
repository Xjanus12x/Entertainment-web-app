import { Link } from "react-router-dom";

type MediaHeaderProps = {
  label: string;
  mediaType?: "movie" | "tv";
  seemoreLink?: string;
};
const MediaHeader = ({ label, mediaType, seemoreLink }: MediaHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <h2
        className="text-xl md:text-3.2xl 2xl:px-0 flex items-center gap-2"
        id={`${label}-${mediaType}`}
      >
        {label}
        {mediaType && (
          <span className="px-3 py-[1px] md:py-[3px] rounded-md uppercase text-xs border-2 border-crispWhite">
            {mediaType}
          </span>
        )}
      </h2>
      {seemoreLink && (
        <Link
          className="hover:underline"
          to={seemoreLink ?? ""}
          aria-label={`Browse more ${label} ${
            mediaType === "movie" ? "Movies" : "TV Show"
          }`}
        >
          See more
        </Link>
      )}
    </header>
  );
};

export default MediaHeader;
