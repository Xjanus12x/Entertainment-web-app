interface BaseMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShow extends BaseMedia {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
}

export interface Movie extends BaseMedia {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

// Specific movie type for search results
export interface SearchMulti extends BaseMedia, Movie {
  media_type: "movie" | "tv";
}

// Specific person type for search results
export interface SearchPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  known_for: SearchKnownFor[];
  media_type: "person";
}

// Known-for type, used within SearchPerson
interface SearchKnownFor extends BaseMedia {
  media_type: "movie" | "tv";
  original_title?: string;
  title?: string;
  original_name?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  origin_country?: string[];
}

// Generic PageData that can work with both TVShow and Movie
export interface SearchResultPageData<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MediaDataResultPageData<T> extends SearchResultPageData<T> {}
