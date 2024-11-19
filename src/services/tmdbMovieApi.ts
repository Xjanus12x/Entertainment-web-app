const API_KEY = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const defaultFetchOptions: RequestInit = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
};

// Helper function to handle fetch requests
const fetchMovies = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, defaultFetchOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }
  return response.json();
};

// Fetch functions for different movie categories
export const trendingMoviesPromise = () =>
  fetchMovies("/trending/movie/week?language=en-US");

export const popularMoviesPromise = () =>
  fetchMovies("/movie/popular?language=en-US");

export const nowPlayingMoviesPromise = () =>
  fetchMovies("/movie/now_playing?language=en-US");

export const upcommingMoviesPromise = () =>
  fetchMovies("/movie/upcoming?language=en-US");

export const topRatedMoviesPromise = () =>
  fetchMovies("/movie/top_rated?language=en-US");
