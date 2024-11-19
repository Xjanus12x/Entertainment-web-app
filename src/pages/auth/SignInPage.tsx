// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { useUser } from "../../context/AuthContext";
// import movieIcon from "../../assets/images/icons/Movie.svg";
// import Input from "../../ui/Input";
// import { useTMDB } from "../../context/TMDBProvider";

// const SignInPage = () => {
//   // ==============================
//   // If user is already logged in, redirect to home
//   const { user, signIn } = useUser();
//   // if (user) return <Navigate to="/" />;
//   // ==============================

//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//   });
//   const { authenticateWithTMDB } = useTMDB();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { email, password } = formValues;
//     if (email && password) {
//       // Encrypt the password using CryptoJS
//       const isSignedIn = await signIn(email, password);
//       if (isSignedIn) {
//         // authenticateWithTMDB();
//       }
//     }
//   };

//   return (
//     <main className="grid content-center px-6 min-h-dvh text-crispWhite gap-[3.625rem]">
//       <img
//         className="justify-self-center"
//         src={movieIcon}
//         alt="Movie icon"
//         aria-hidden
//       />
//       <div className="grid gap-6 p-6 bg-deepNavy w-full max-w-[25rem] container justify-self-center rounded-lg">
//         <form className="grid gap-10" onSubmit={handleSubmit}>
//           <header className="text-2.5xl">
//             <h1>Login</h1>
//           </header>
//           <div className="grid gap-6">
//             <Input
//               className="pb-4 pl-4 caret-vividRed"
//               id="email"
//               name="email"
//               type="email"
//               label="Email"
//               placeholder="Enter your email"
//               value={formValues.email}
//               onChange={handleInputChange}
//             />
//             <Input
//               className="pb-4 pl-4 caret-vividRed"
//               id="password"
//               name="password"
//               type="password"
//               label="Password"
//               placeholder="Enter your password"
//               value={formValues.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button
//             className="bg-vividRed px-[4.25rem] py-[0.938rem] rounded-md"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>

//         <Link className="text-center" to="/auth/sign-up">
//           Don't have an account?
//           <span className="ml-2 text-vividRed">Sign Up</span>
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default SignInPage;
