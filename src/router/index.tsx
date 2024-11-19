import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
// import SignInPage from "../pages/auth/SignInPage.tsx";
// import SignUpPage from "../pages/auth/SignUpPage.tsx";
// import ProtectedPage from "../pages/ProtectedPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
// import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import Layout from "../pages/Layout.tsx";
import MovieGenresPage from "../pages/MovieGenresPage.tsx";
import TVShowGenresPage from "../pages/TVShowGenresPage.tsx";
import MediasByGenre from "../pages/MediasByGenre.tsx";
import MediasPage from "../pages/MediasPage.tsx";
import SearchResultPage from "../pages/SearchResultPage.tsx";
import MovieDescriptionPage from "../pages/MovieDescriptionPage.tsx";
import TVSeriesDescriptionPage from "../pages/TVSeriesDescriptionPage.tsx";
import AuthResultPage from "../pages/auth/AuthResultPage.tsx";
import BookmarksPage from "../pages/BookmarksPage.tsx";

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <HomePage />,
            index: true,
          },
          {
            path: "search",
            element: <SearchResultPage />,
          },
          {
            path: "auth",
            element: <AuthResultPage />,
          },
          {
            path: "movies",
            children: [
              { element: <MovieGenresPage />, index: true },
              {
                path: "search",
                element: <SearchResultPage />,
              },
              {
                path: "trending/:page?",
                element: (
                  <MediasPage
                    mediaType="movie"
                    label="Trending"
                    url="https://api.themoviedb.org/3/trending/movie/day?language=en-US"
                  />
                ),
              },
              {
                path: "popular/:page?",
                element: (
                  <MediasPage
                    mediaType="movie"
                    label="Popular"
                    url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "now-playing/:page?",
                element: (
                  <MediasPage
                    mediaType="movie"
                    label="Now Playing"
                    url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "upcomming/:page?",
                element: (
                  <MediasPage
                    mediaType="movie"
                    label="Upcomming"
                    url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "top-rated/:page?",
                element: (
                  <MediasPage
                    mediaType="movie"
                    label="Top Rated"
                    url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "genre/:id/:name?/:page?",
                element: <MediasByGenre mediaType="movie" />,
              },
              {
                path: ":id",
                element: <MovieDescriptionPage />,
              },
            ],
          },
          {
            path: "tv",
            children: [
              { element: <TVShowGenresPage />, index: true },
              {
                path: "search",
                element: <SearchResultPage />,
              },
              {
                path: "trending/:page?",
                element: (
                  <MediasPage
                    mediaType="tv"
                    label="Trending"
                    url="https://api.themoviedb.org/3/trending/tv/day?language=en-US"
                  />
                ),
              },
              {
                path: "popular/:page?",
                element: (
                  <MediasPage
                    mediaType="tv"
                    label="Popular"
                    url="https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "airing-today/:page?",
                element: (
                  <MediasPage
                    mediaType="tv"
                    label="Airing Today"
                    url="https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "on-air/:page?",
                element: (
                  <MediasPage
                    mediaType="tv"
                    label="On Air"
                    url="https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "top-rated/:page?",
                element: (
                  <MediasPage
                    mediaType="tv"
                    label="Top Rated"
                    url="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
                  />
                ),
              },
              {
                path: "genre/:id/:name?/:page?",
                element: <MediasByGenre mediaType="tv" />,
              },
              {
                path: ":id",
                element: <TVSeriesDescriptionPage />,
              },
            ],
          },
          {
            path: "bookmarks/:page?",
            element: <BookmarksPage />,
          },
        ],
      },
      // {
      //   path: "/auth/sign-in",
      //   element: <SignInPage />,
      // },
      // {
      //   path: "/auth/sign-up",
      //   element: <SignUpPage />,
      // },
      // Auth Protected routes
      // {
      //   path: "/",
      //   element: <AuthProtectedRoute />,
      //   children: [
      //     {
      //       path: "/protected",
      //       element: <ProtectedPage />,
      //     },
      //   ],
      // },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
