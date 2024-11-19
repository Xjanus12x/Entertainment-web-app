// import movieIcon from "../../assets/images/icons/Movie.svg";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Input from "../../ui/Input";
// import { useDebounce, useEmailAvailability } from "../../hooks";
// import { encrytPassword } from "../../utils/userSecurity";
// import { useUser } from "../../context/AuthContext";
// const SignUpPage = () => {
//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//     repeatPassword: "",
//   });
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [isPasswordValid, setIsPasswordValid] = useState(false);
//   const [isPasswordMatch, setIsPasswordMatch] = useState(false);
//   const { email, password, repeatPassword } = formValues;
//   const emailDebounced = useDebounce(email);
//   const { isEmailExist } = useEmailAvailability(emailDebounced);
//   const { signUp } = useUser();

//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePassword = (password: string) => {
//     return password.length >= 8; // Example: minimum 8 characters
//   };

//   const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));

//     if (name === "email") setIsEmailValid(validateEmail(value));
//     if (name === "password") setIsPasswordValid(validatePassword(value));
//     if (name === "repeatPassword")
//       setIsPasswordMatch(value === formValues.password);
//   };

//   const isValidForm =
//     isEmailValid && !isEmailExist && isPasswordValid && isPasswordMatch;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (isValidForm) {
//       const { email, password } = formValues;
//       // Encrypt the password using CryptoJS
//       const encryptedPassword = encrytPassword(password);
//       await signUp(email, encryptedPassword);
//     }
//   };

//   return (
//     <main className="grid content-center px-6 min-h-dvh text-crispWhite gap-[3.625rem] relative">
//       {/* {display && (
//         <div className="absolute inset-0 p-5 text-5xl bg-red-500 text-crispWhite">
//           <h2>HELO</h2>
//         </div>
//       )} */}
//       <img
//         className="justify-self-center"
//         src={movieIcon}
//         alt="Movie icon"
//         aria-hidden
//       />
//       <div className="grid gap-6 p-6 bg-deepNavy w-full max-w-[25rem] container justify-self-center rounded-lg">
//         <form className="grid gap-10" onSubmit={handleSubmit}>
//           <header className="text-2.5xl">
//             <h1>Sign Up</h1>
//           </header>
//           <div className="grid gap-6">
//             <div className="relative grid gap-1">
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 aria-labelledby="email"
//                 onChange={handleInputChange}
//               />
//               {!isEmailValid && email && (
//                 <span className="text-vividRed">Invalid email format</span>
//               )}
//               {isEmailExist && (
//                 <span className="text-vividRed">email already exist</span>
//               )}
//             </div>
//             <div className="grid gap-1">
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 label="Password"
//                 placeholder="Enter your password"
//                 aria-labelledby="password"
//                 onChange={handleInputChange}
//               />
//               {!isPasswordValid && password && (
//                 <span className="text-vividRed">
//                   Password must be at least 8 characters
//                 </span>
//               )}
//             </div>
//             <div className="grid gap-1">
//               <Input
//                 id="repeatPassword"
//                 name="repeatPassword"
//                 type="password"
//                 label="Repeat Password"
//                 placeholder="Repeat Password"
//                 aria-labelledby="repeat-password"
//                 onChange={handleInputChange}
//               />
//               {!isPasswordMatch && repeatPassword && (
//                 <span className="text-vividRed">Passwords do not match</span>
//               )}
//             </div>
//           </div>
//           <button
//             className="bg-vividRed px-[4.25rem] py-[0.938rem] rounded-md"
//             type="submit"
//             disabled={!isValidForm}
//           >
//             Create an account
//           </button>
//         </form>

//         <Link className="text-center" to="/auth/sign-in">
//           Already have an account?
//           <span className="ml-2 text-vividRed">Login</span>
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default SignUpPage;
