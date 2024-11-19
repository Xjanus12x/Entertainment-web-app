import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TMDBProvider } from "./context/TMDBProvider";
import { ModalProvider } from "./context/ModalProvider";

const queryClient = new QueryClient();

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <UserDataProvider> */}
      <ModalProvider>
        <TMDBProvider>
          <Outlet />
        </TMDBProvider>
      </ModalProvider>
      {/* </UserDataProvider> */}
    </QueryClientProvider>
  );
};

export default Providers;
