import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modal: ModalData | null;
  setModal: React.Dispatch<React.SetStateAction<ModalData | null>>;
  isNotificationOpen: boolean;
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notificationMessages: Popup[];
  addNotification: (message: string) => void;
};

const modalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error("useModal must be use inside modalContext");
  }
  return {
    modal: context.modal,
    setModal: context.setModal,
    isOpen: context.isModalOpen,
    setIsOpen: context.setIsModalOpen,
  };
};

export const useNotifitcation = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error("useNotification must be use inside modalContext");
  }
  return {
    isNotificationOpen: context.isNotificationOpen,
    setIsNotificationOpen: context.setIsNotificationOpen,
    notificationMessages: context.notificationMessages,
    addNotification: context.addNotification,
  };
};
type ModalProviderProps = PropsWithChildren;

type ModalData = {
  header: string;
  body: string;
};
type Popup = {
  id: string;
  message: string;
};
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState<ModalData | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessages, setNotificationMessages] = useState<Popup[]>([]);

  const addNotification = (message: string) => {
    const newPopup: Popup = { id: new Date().toISOString(), message };

    // Add the new popup to the state
    setNotificationMessages((prevPopups) => [...prevPopups, newPopup]);

    // Remove the popup after 5 seconds (or any time you want)
    setTimeout(() => {
      setNotificationMessages((prevPopups) =>
        prevPopups.filter((popup) => popup.id !== newPopup.id)
      );
    }, 2000); // 5000ms (2 seconds) delay
  };
  return (
    <modalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        modal,
        setModal,
        isNotificationOpen,
        setIsNotificationOpen,
        notificationMessages,
        addNotification,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
