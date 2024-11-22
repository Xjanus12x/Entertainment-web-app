import { useEffect, useState } from "react";
import searchIcon from "../assets/images/icons/search.svg";
import Input from "./Input";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce, useDynamicSearchLabel } from "../hooks";

const routeTo = (pathname: string, query: string) => {
  const basePath = pathname.includes("movies")
    ? "movies/search"
    : pathname.includes("tv")
    ? "tv/search"
    : "/search";
  return `${basePath}?query=${encodeURIComponent(query)}&page=1`;
};

const SearchBar = () => {
  const [searchParams, _] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [localSearch, setLocalSearch] = useState<string>(query);
  const localSearchedDebounced = useDebounce(localSearch);
  const searchLabel = useDynamicSearchLabel();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (localSearchedDebounced) {
      navigate(routeTo(pathname, localSearchedDebounced));
    }
  }, [localSearchedDebounced]);

  return (
    <form
      className="flex gap-6 px-4 2xl:px-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <img src={searchIcon} aria-hidden={true} />
      <Input
        className="w-full p-0 border-none"
        id="search"
        label={searchLabel}
        name="search"
        type="text"
        placeholder={searchLabel}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
