import { Link, Navigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { FirebaseAuth } from "../firebase";
import SignUpPage from "./auth/SignUpPage";
import searchIcon from "../assets/images/icons/search.svg";
import AdaptiveNavBar from "../components/AdaptiveNavBar";
import Input from "../ui/Input";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const { user } = useUser();

  // Redirect to /sign-in if not authenticated
  // if (!user) return <Navigate to="/auth/sign-in" replace />;
  return (
    <div className="space-y-8">
      <AdaptiveNavBar />
      <main>
        <section className="space-y-8 overflow-hidden" role="region">
          <header>
            <form className="flex gap-6">
              <button aria-label="Search movies or TV series">
                <img src={searchIcon} aria-hidden={true} />
              </button>

              <Input
                className="w-full pb-0 border-b-0"
                id="search"
                label="Search for movies or TV series"
                name="search"
                type="text"
                placeholder="Search for movies or TV series"
              />
            </form>
          </header>

          <section
            className=" text-crispWhite"
            role="region"
            aria-labelledby="trending"
          >
            <header className="text-2.5xl">
              <h2 id="trending">Trending</h2>
            </header>

            <div className="w-full max-w-md p-4 space-x-4 carousel rounded-box carousel-center">
              <div className="carousel-item">
                <MovieCard />
              </div>
              <div className="carousel-item">
                <MovieCard />
              </div>
              <div className="carousel-item">
                <MovieCard />
              </div>
              <div className="carousel-item">
                <MovieCard />
              </div>
              <div className="carousel-item">
                <MovieCard />
              </div>
              <div className="carousel-item">
                <MovieCard />
              </div>
            </div>
          </section>

          <section
            className="text-crispWhite"
            role="region"
            aria-labelledby="recommended"
          >
            <header className="text-2.5xl">
              <h2 id="recommended">Recommended for you</h2>
            </header>
          </section>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
