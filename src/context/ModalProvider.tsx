import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modal: ModalData | null;
  setModal: React.Dispatch<React.SetStateAction<ModalData | null>>;
  isNotificationOpen: boolean;
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notificationMessages: string[];
  setNotificationMessages: React.Dispatch<React.SetStateAction<string[]>>;
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
    setNotificationMessages: context.setNotificationMessages,
  };
};
type ModalProviderProps = PropsWithChildren;

type ModalData = {
  header: string;
  body: string;
};
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState<ModalData | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessages, setNotificationMessages] = useState<string[]>(
    []
  );
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
        setNotificationMessages,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
