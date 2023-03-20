import { NavLink } from "react-router-dom";
import MovieList from "@/components/MovieList";
import { useSavedList } from "@/services/hooks/useMovies";

function Favorites() {
  const { data: favorites } = useSavedList("favorites");

  return (
    <div>
      <h2 className="text-xl font-bold">Your favorite movies</h2>
      {favorites && favorites?.length > 0 ? (
        <MovieList movies={favorites} />
      ) : (
        <p className="mt-2">
          You don’t have any favorite movies yet.{" "}
          <span className="hidden lg:inline">Press Ctrl + K to search</span>
          <span className="lg:hidden">Search above</span> or find one in the{" "}
          <NavLink to="/" className="font-bold underline">
            trending
          </NavLink>{" "}
          movies.
        </p>
      )}
    </div>
  );
}

export default Favorites;
