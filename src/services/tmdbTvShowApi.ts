const API_KEY = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const defaultFetchOptions: RequestInit = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
};

// Helper function to fetch data from TMDB
const fetchTVShows = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, defaultFetchOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }
  return response.json();
};

// Fetch functions for different TV show categories
export const trendingTVShowsPromise = () =>
  fetchTVShows("/trending/tv/day?language=en-US");

export const popularTVShowsPromise = () =>
  fetchTVShows("/tv/popular?language=en-US&page=1");

export const airingTodayTVShowsPromise = () =>
  fetchTVShows("/tv/airing_today?language=en-US&page=1");

export const onAirTVShowsPromise = () =>
  fetchTVShows("/tv/on_the_air?language=en-US&page=1");

export const topRatedTVShowsPromise = () =>
  fetchTVShows("/tv/top_rated?language=en-US&page=1");
