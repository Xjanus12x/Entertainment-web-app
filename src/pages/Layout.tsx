import { Outlet } from "react-router-dom";
// import { useUser } from "../context/AuthContext";
import AdaptiveNavBar from "../components/AdaptiveNavBar";
import SearchBar from "../ui/SearchBar";
import Modal from "../components/Modal";
import { useModal } from "../context/ModalProvider";
import Notification from "../components/Notification";

const Layout = () => {
  // const { user } = useUser();
  // Redirect to /sign-in if not authenticated
  // if (!user) return <Navigate to="/auth/sign-in" replace />;
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <div className="relative space-y-6 sm:space-y-8 md:flex min-h-dvh md:space-y-16">
        <AdaptiveNavBar />
        <main className="max-w-[77.5rem] mx-auto w-full">
          <section
            className="grid space-y-6 sm:space-y-8 pb-[3.813rem] px-4 "
            role="region"
          >
            <header>
              <SearchBar />
            </header>

            <Outlet />
          </section>
        </main>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Notification />
    </>
  );
};

export default Layout;
