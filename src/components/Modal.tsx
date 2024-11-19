import ReactDOM from "react-dom";
import movieIcon from "../assets/images/icons/Movie.svg";
import { useTMDB } from "../context/TMDBProvider";
import { useModal } from "../context/ModalProvider";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
};

const Modal = ({ isOpen, onClose, isLoading }: ModalProps) => {
  const { redirectToTMDBLogin, authenticationStatus } = useTMDB();
  const { modal } = useModal();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="grid content-center px-6 text-crispWhite gap-[3.625rem] min-w-[90%]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <img
          className="justify-self-center"
          src={movieIcon}
          alt="Movie icon"
          aria-hidden
        />
        <div className="p-6 bg-deepNavy w-full max-w-[25rem] container justify-self-center rounded-lg">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              Authenticating
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <div className="grid gap-7">
              <header className="text-2.5xl flex justify-between">
                <h1>{modal?.header}</h1>
              </header>
              <p className="text-lg">{modal?.body}</p>
              <div className="grid gap-4">
                {authenticationStatus === "unauthenticated" && (
                  <button
                    className="bg-vividRed px-[4.25rem] py-[0.938rem] rounded-md hover:bg-red-700"
                    type="button"
                    onClick={redirectToTMDBLogin}
                  >
                    Login to TMDB
                  </button>
                )}

                <button className="hover:underline" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
