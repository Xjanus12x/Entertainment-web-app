import { Movie } from "../models/SearchResult";

export const isMovieArray = (items: any[]): items is Movie[] => {
  return items.every((item) => "title" in item); // Adjust to a unique property of Movie
};

