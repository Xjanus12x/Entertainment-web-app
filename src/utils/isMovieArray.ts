import { Movie } from "../models/Media";

export const isMovieArray = (items: any[]): items is Movie[] => {
  return items.every((item) => "title" in item); // Adjust to a unique property of Movie
};

