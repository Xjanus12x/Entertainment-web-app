import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDynamicSearchLabel = () => {
  const location = useLocation();
  const [searchLabel, setSearchLabel] = useState("");

  useEffect(() => {
    let label = "Search for";
    if (location.pathname.includes("movies")) label += " movies";
    else if (location.pathname.includes("tv-show")) label += " TV series";
    else label += " movies or TV series";

    setSearchLabel(label);
  }, [location.pathname]);

  return searchLabel;
};

export default useDynamicSearchLabel;
