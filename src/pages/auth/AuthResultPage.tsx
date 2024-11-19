import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { useEffect } from "react";
import { useModal } from "../../context/ModalProvider";
import { useTMDB } from "../../context/TMDBProvider";

const AuthResultPage = () => {
  const [searchParams, _] = useSearchParams();
  const requestToken = searchParams.get("request_token");
  const userApprovedAccess = Boolean(searchParams.get("approved"));

  const {
    setSessionId,
    newSessionId,
    setAuthenticationStatus,
    isAccountDataLoaing,
    accountData,
  } = useTMDB();
  const { setModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (requestToken && userApprovedAccess && newSessionId) {
      localStorage.setItem("tmdb_session_id", newSessionId);
      setModal({
        header: "You're All Set!",
        body: "Access granted! You can now bookmark your favorite movies and TV shows. Start exploring and saving what you love!",
      });
      setSessionId(newSessionId);
      setAuthenticationStatus("authenticated");
    } else {
      setModal({
        header: "Access Denied",
        body: "To bookmark your favorite movies and TV shows, please grant access to your TMDB account. Without it, you won't be able to save your favorite content.",
      });
    }
  }, [
    requestToken,
    userApprovedAccess,
    accountData,
    isAccountDataLoaing,
    newSessionId,
    setModal,
    setSessionId,
    setAuthenticationStatus,
  ]);

  return (
    <Modal
      isOpen={true}
      onClose={() => navigate("/")}
      isLoading={isAccountDataLoaing && userApprovedAccess}
    />
  );
};

export default AuthResultPage;
