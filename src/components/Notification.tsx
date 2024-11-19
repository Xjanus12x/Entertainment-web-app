import ReactDOM from "react-dom";
import { useNotifitcation } from "../context/ModalProvider";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Notification = ({ isOpen, onClose }: ModalProps) => {
  const { notificationMessages, setNotificationMessages } = useNotifitcation();
  useEffect(() => {
    if (isOpen && notificationMessages.length === 0) {
      onClose();
    }
  }, [onClose, isOpen, notificationMessages]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed right-6 bottom-6 bg-rd-500 text-crispWhite gap-[3.625rem] z-50"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <div className="grid gap-6 p-6 bg-deepNavy w-full max-w-[25rem] container justify-self-center rounded-lg">
        <ul>
          <AnimatePresence>
            {notificationMessages.map((notificationMessage, i) => {
              return (
                <motion.li
                  className="mb-2" // Adds margin-bottom to each list item
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={() => {
                    setTimeout(() => {
                      setNotificationMessages((prev) => prev.slice(1));
                    }, 2000);
                  }}
                >
                  <p className="text-lg">{notificationMessage}</p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Notification;
