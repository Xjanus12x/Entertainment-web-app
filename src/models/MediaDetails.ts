// Common types shared between movies and TV shows
type Genre = {
  id: number;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
};

type Country = {
  iso_3166_1: string;
  name: string;
};

type MediaCastAndCrew = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  character: string;
  credit_id: string;
  order: number;
};

type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
};
type BaseMediaDetails = {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  homepage?: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: Country[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
};
// MovieDetails type extends BaseMediaDetails
type MovieDetails = BaseMediaDetails & {
  belongs_to_collection?: BelongToCollection;
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
};

type BelongToCollection = {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
};

// TVShowDetails type extends BaseMediaDetails
type TVShowDetails = BaseMediaDetails & {
  created_by: any[]; // This can be refined further if you have the structure
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
};

type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
};

type Network = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};
export type { MovieDetails, TVShowDetails, MediaCastAndCrew };
