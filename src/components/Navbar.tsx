import { Link, NavLink } from "react-router-dom";
import {
  BookmarkIcon as BookmarkIconOutline,
  FireIcon as FireIconOutline,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  FireIcon as FireIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import Searchbar from "@/components/Searchbar";

function Navbar() {
  return (
    <nav className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
      <Link to="/" className="flex items-center gap-2 text-3xl font-extrabold">
        <img src="/movierama.svg" alt="Movierama logo" className="h-8 w-8" />
        Movierama
      </Link>
      <ul className="fixed bottom-0 z-50 -mx-2 flex w-full justify-around gap-4 bg-gray-900/50 py-1 backdrop-blur lg:static lg:mx-8 lg:w-auto lg:gap-8">
        <li className="inline-flex">
          <NavLink to="/" className="flex flex-col items-center">
            {({ isActive }) => (
              <>
                <span className="lg:hidden">
                  {isActive ? (
                    <FireIconSolid className="h-8 w-8" />
                  ) : (
                    <FireIconOutline className="h-8 w-8" />
                  )}
                </span>
                <span
                  className={`text-xs lg:text-base ${
                    isActive ? "lg:font-extrabold" : "font-normal"
                  }`}
                >
                  Trending
                </span>
              </>
            )}
          </NavLink>
        </li>
        <li className="inline-flex">
          <NavLink to="/favorites" className="flex flex-col items-center">
            {({ isActive }) => (
              <>
                <span className="lg:hidden">
                  {isActive ? (
                    <HeartIconSolid className="h-8 w-8" />
                  ) : (
                    <HeartIconOutline className="h-8 w-8" />
                  )}
                </span>
                <span
                  className={`text-xs lg:text-base ${
                    isActive ? "lg:font-extrabold" : "font-normal"
                  }`}
                >
                  Favorites
                </span>
              </>
            )}
          </NavLink>
        </li>
        <li className="inline-flex">
          <NavLink to="/watchlist" className="flex flex-col items-center">
            {({ isActive }) => (
              <>
                <span className="lg:hidden">
                  {isActive ? (
                    <BookmarkIconSolid className="h-8 w-8" />
                  ) : (
                    <BookmarkIconOutline className="h-8 w-8" />
                  )}
                </span>
                <span
                  className={`text-xs lg:text-base ${
                    isActive ? "lg:font-extrabold" : "font-normal"
                  }`}
                >
                  Watchlist
                </span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
      <Searchbar />
    </nav>
  );
}

export default Navbar;
