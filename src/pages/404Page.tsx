import { Link } from "react-router-dom";
import errorImage from "../assets/images/error.webp";
const NotFoundPage: React.FC = () => {
  return (
    <section className="grid content-center text-center min-h-dvh text-crispWhite justify-items-center">
      <img
        className="size-10 lg:size-20"
        src={errorImage}
        alt="Error 404 emoji"
      />
      <h1 className="font-bold header-text lg:text-xl">404 Page Not Found</h1>
      <Link
        className="font-bold hover:underline focus-visible:underline"
        to="/"
      >
        Go back to Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
