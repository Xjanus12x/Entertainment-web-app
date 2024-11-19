// import { createContext, useContext, useEffect, useState } from "react";
// import LoadingPage from "../pages/LoadingPage";
// import { getUsersFetchOptions } from "../utils/fetchOptions";
// import { decryptPassword, encrytPassword } from "../utils/userSecurity";
// import useRegisterUser from "../hooks/useRegisterUser";

// const fetchUsers = async (): Promise<User[]> => {
//   const response = await fetch(
//     "https://entertainment-web-app-dc4b1-default-rtdb.firebaseio.com/user.json",
//     getUsersFetchOptions
//   );
//   if (!response.ok) throw new Error("Failed to fetch users");
//   const data = await response.json();
//   return data ? (Object.values(data) as User[]) : [];
// };

// // Define a new type that includes the user and isLoading state
// type UserContextType = {
//   user: { email: string } | null;
//   signIn: (email: string, password: string) => Promise<boolean>;
//   signUp: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// };

// export const UserDataContext = createContext<UserContextType | null>(null);

// export const useUser = () => {
//   const context = useContext(UserDataContext);
//   if (!context) {
//     throw new Error("useUserData must be used within a UserDataProvider");
//   }
//   return context;
// };

// type Props = { children: React.ReactNode };

// export const UserDataProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<{ email: string } | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { mutate: registerUser } = useRegisterUser();

//   const signIn = async (email: string, password: string): Promise<boolean> => {
//     const users = await fetchUsers();
//     const foundUser = users.find((u) => u.email === email);

//     if (foundUser) {
//       const decryptedPassword = decryptPassword(foundUser.password);
//       if (decryptedPassword === password) {
//         setUser({ email });
//         localStorage.setItem("user", JSON.stringify({ email }));
//         return true;
//       }
//     }
//     return false;
//   };

//   const signUp = async (email: string, password: string) => {
//     const encryptedPassword = encrytPassword(password);
//     const newUser = { email, password: encryptedPassword };
//     registerUser(newUser, {
//       onSuccess: () => {
//         // // setDisplay(false); // Show success message
//         // setTimeout(() => {
//         //   navigate("/auth/sign-in");
//         //   setDisplay(false);
//         // }, 2000);
//       },
//       onError: () => {},
//     });
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   return (
//     <UserDataContext.Provider value={{ user, signIn, signUp, logout }}>
//       {isLoading ? <LoadingPage /> : children}
//     </UserDataContext.Provider>
//   );
// };
