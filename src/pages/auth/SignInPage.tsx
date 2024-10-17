import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FirebaseAuth } from "../../firebase";
import { useUser } from "../../context/AuthContext";
import movieIcon from "../../assets/images/icons/Movie.svg";
import Input from "../../ui/Input";

const SignInPage = () => {
  // ==============================
  // If user is already logged in, redirect to home
  // This logic is being repeated in SignIn and SignUp..
  const { user } = useUser();
  if (user) return <Navigate to="/" />;
  // maybe we can create a wrapper component for these pages
  // just like the ./router/AuthProtectedRoute.tsx? up to you.
  // ==============================
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        FirebaseAuth,
        formValues.email,
        formValues.password
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="grid content-center px-6 min-h-dvh text-crispWhite gap-[3.625rem]">
      <img
        className="justify-self-center"
        src={movieIcon}
        alt="Movie icon"
        aria-hidden
      />
      <div className="grid gap-6 p-6 bg-deepNavy w-full max-w-[25rem] container justify-self-center rounded-lg">
        <form className="grid gap-10" onSubmit={handleSubmit}>
          <header className="text-2.5xl">
            <h1>Login</h1>
          </header>
          <div className="grid gap-6">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="bg-vividRed px-[4.25rem] py-[0.938rem] rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>

        <Link className="text-center" to="/auth/sign-up">
          Don't have an account?
          <span className="ml-2 text-vividRed">Sign Up</span>
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
