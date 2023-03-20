import { NavLink } from "react-router-dom";
import ListUpdateActions from "@/components/ListUpdateActions";
import { useSavedList } from "@/services/hooks/useMovies";

function MovieList({ movies }: { movies: Movie[] }) {
  const { data: favorites } = useSavedList("favorites");
  const { data: watchlist } = useSavedList("watchlist");

  // Add information about whether the movie is in the favorites or watchlist
  const moviesWithListInfo = movies.map((movie) => ({
    ...movie,
    isInFavorites: favorites?.some((favorite) => favorite.id === movie.id),
    isInWatchlist: watchlist?.some(
      (watchlistItem) => watchlistItem.id === movie.id
    ),
  }));

  return (
    <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
      {moviesWithListInfo.map((movie) => (
        <li key={movie.id} className="group relative">
          <NavLink to={`/movies/${movie.id}`}>
            <img
              className="rounded-md"
              src={`${import.meta.env.VITE_IMG_URL}/w500/${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
            />
            <div className="absolute bottom-0 m-1 hidden rounded bg-gray-900/90 p-1 text-sm group-hover:block">
              {movie.title}{" "}
              {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
            </div>
          </NavLink>
          <div className="absolute top-1 right-1 hidden justify-between rounded bg-gray-900/90 p-1 group-hover:flex">
            <ListUpdateActions
              movie={movie}
              isInFavorites={movie.isInFavorites}
              isInWatchlist={movie.isInWatchlist}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
