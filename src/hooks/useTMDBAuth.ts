import { useEffect, useState } from "react";
import { useModal } from "../context/ModalProvider";
import { AccountDetails } from "../models/AccountDetails";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

/** Fetch a new request token from TMDB */
const getRequestToken = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.request_token;
};

/** Create a new session ID using a request token */
const createSessionId = async (requestToken: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_token: requestToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    const data = await response.json();
    if (!data.session_id) {
      throw new Error("No session ID returned");
    }

    return data.session_id;
  } catch (error) {
    throw error;
  }
};

/** Fetch TMDB account details using a session ID */
const getAccountDetails = async (
  sessionId: string
): Promise<AccountDetails> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account?api_key=${TMDB_API_KEY}&session_id=${sessionId}`
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Session expired or unauthorized");
    }
    throw new Error("Failed to fetch account details");
  }

  const data = await response.json();
  return data;
};
type AuthenticationStatus = "authenticated" | "unauthenticated";

/** Custom hook for TMDB authentication */
export const useTMDBAuth = () => {
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("tmdb_session_id")
  );
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>("unauthenticated");
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsOpen, setModal } = useModal();
  const requestToken = searchParams.get("request_token");
  const userApprovedAccess = Boolean(searchParams.get("approved"));
  const location = useLocation();
  const {
    data: accountData,
    error: accountError,
    isError: accountFetchError,
    isLoading: isAccountDataLoaing,
  } = useQuery({
    queryKey: ["accountDetails", sessionId],
    queryFn: async (): Promise<AccountDetails> => {
      if (!sessionId) throw new Error("No session ID");
      return await getAccountDetails(sessionId);
    },
    enabled: !!sessionId,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
  });

  const { data: newSessionId } = useQuery({
    queryFn: async () => {
      if (requestToken) {
        return await createSessionId(requestToken);
      }
      throw new Error("No request token available");
    },
    queryKey: ["sessionId"],
    enabled: !!requestToken && userApprovedAccess,
    staleTime: 1000 * 60 * 5,
  });

  const redirectToTMDBLogin = async () => {
    const token = await getRequestToken();
    if (token) {
      setSearchParams({});
      const redirectUrl = `${encodeURIComponent(window.location.href)}auth`;
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${redirectUrl}`;
    }
  };

  const handleLogout = () => {
    setSessionId(null);
    localStorage.removeItem("tmdb_session_id");
  };

  useEffect(() => {
    if (
      accountFetchError &&
      (accountError as Error).message === "Session expired or unauthorized" &&
      !location.pathname.includes("auth")
    ) {
      setIsOpen(true);
      setModal({
        header: "Session Expired",
        body: "Your session has expired. Please log in again to restore access and continue saving your favorite content.",
      });
      localStorage.removeItem("tmdb_session_id");
    }
  }, [accountFetchError, accountError]);

  return {
    sessionId,
    accountData,
    newSessionId,
    authenticationStatus,
    isAccountDataLoaing,
    setAuthenticationStatus,
    redirectToTMDBLogin,
    handleLogout,
    setSessionId,
    createSessionId,
  };
};
