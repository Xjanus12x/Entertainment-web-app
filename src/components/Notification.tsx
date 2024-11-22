import ReactDOM from "react-dom";
import { useNotifitcation } from "../context/ModalProvider";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Notification = () => {
  const { notificationMessages, isNotificationOpen, setIsNotificationOpen } =
    useNotifitcation();

  useEffect(() => {
    let timeout;
    if (notificationMessages.length > 0) {
      setIsNotificationOpen(true);
    } else {
      timeout = setTimeout(() => {
        setIsNotificationOpen(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isNotificationOpen, notificationMessages, setIsNotificationOpen]);

  if (!isNotificationOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed right-6 bottom-6 bg-rd-500 text-crispWhite gap-[3.625rem] z-50"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <ul className="grid gap-3 lg:gap-6 p-6  w-full max-w-[25rem] container justify-self-center rounded-lg">
        <AnimatePresence>
          {notificationMessages.map(({ id, message }) => {
            return (
              <motion.li
                className="p-4 rounded-md bg-deepNavy" // Adds margin-bottom to each list item
                key={id}
                initial={{ x: "100%", scale: 0.5 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: "100%", scale: 0.5 }}
              >
                <p className="text-xs lg:text-lg">{message}</p>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Notification;
