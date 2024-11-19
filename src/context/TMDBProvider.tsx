import { createContext, useContext, ReactNode } from "react";
import { useTMDBAuth } from "../hooks/useTMDBAuth";
import { Movie, TVShow, SearchResultPageData } from "../models/SearchResult";
import { useFetchWatchlist } from "../hooks";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "@tanstack/react-query";

type TMDBContextType = ReturnType<typeof useTMDBAuth> & {
  movieWatchListData?: SearchResultPageData<Movie> | null;
  tvShowWatchListData?: SearchResultPageData<TVShow> | null;
  isLoadingMovieWatchList: boolean;
  isLoadingTvShowWatchList: boolean;
  watchlistId: { [x: number]: boolean };
  refetchMovieWatchList: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<SearchResultPageData<Movie>, unknown>>;
  refetchTvShowWatchList: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<SearchResultPageData<TVShow>, unknown>>;
};

const TMDBContext = createContext<TMDBContextType | null>(null);

export const useTMDB = () => {
  const context = useContext(TMDBContext);
  if (!context) {
    throw new Error("useTMDB must be used within a TMDBProvider");
  }
  return context;
};

type TMDBProviderProps = { children: ReactNode };

export const TMDBProvider = ({ children }: TMDBProviderProps) => {
  const {
    sessionId,
    setSessionId,
    createSessionId,
    accountData,
    redirectToTMDBLogin,
    handleLogout,
    isAccountDataLoaing,
    newSessionId,
    authenticationStatus,
    setAuthenticationStatus,
  } = useTMDBAuth();

  const {
    movieWatchListData,
    tvShowWatchListData,
    isLoadingMovieWatchList,
    isLoadingTvShowWatchList,
    refetchMovieWatchList,
    refetchTvShowWatchList,
    watchlistId,
  } = useFetchWatchlist(accountData!, sessionId);

  return (
    <TMDBContext.Provider
      value={{
        newSessionId,
        sessionId,
        setSessionId,
        createSessionId,
        accountData,
        redirectToTMDBLogin,
        handleLogout,
        authenticationStatus,
        setAuthenticationStatus,
        isAccountDataLoaing,
        movieWatchListData,
        tvShowWatchListData,
        isLoadingMovieWatchList,
        isLoadingTvShowWatchList,
        watchlistId,
        refetchMovieWatchList,
        refetchTvShowWatchList,
      }}
    >
      {children}
    </TMDBContext.Provider>
  );
};
