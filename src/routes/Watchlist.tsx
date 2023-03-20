import { NavLink } from "react-router-dom";
import MovieList from "@/components/MovieList";
import { useSavedList } from "@/services/hooks/useMovies";

function Watchlist() {
  const { data: watchlist } = useSavedList("watchlist");

  return (
    <div>
      <h2 className="text-xl font-bold">Movies you want to watch</h2>
      {watchlist && watchlist.length > 0 ? (
        <MovieList movies={watchlist} />
      ) : (
        <p className="mt-2">
          You don’t have any movies yet in your watchlist.{" "}
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

export default Watchlist;
