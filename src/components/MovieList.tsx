import { NavLink } from "react-router-dom";
import {
  ArrowsPointingOutIcon,
  BookmarkIcon as BookmarkIconOutline,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavedList, updateSavedList } from "@/api/movies";

function MovieList({ movies }: { movies: Movie[] }) {
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getSavedList("favorites"),
  });

  const { data: watchlist } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => getSavedList("watchlist"),
  });

  const mutationListUpdate = useMutation({
    mutationFn: updateSavedList,
    onSuccess: (_, { list }) =>
      queryClient.invalidateQueries({ queryKey: [list] }),
  });

  // Add information about whether the movie is in the favorites or watchlist
  const moviesWithListInfo = movies.map((movie) => {
    movie.isInFavorites = favorites?.some(
      (favorite: Movie) => favorite.id === movie.id
    );
    movie.isInWatchlist = watchlist?.some(
      (watchlistItem: Movie) => watchlistItem.id === movie.id
    );

    return movie;
  });

  return (
    <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
      {moviesWithListInfo.map((movie) => (
        <li key={movie.id} className="group relative">
          <NavLink
            to={`/movies/${movie.id}`}
            className="flex items-center justify-center"
          >
            <img
              className="rounded-md"
              src={`${import.meta.env.VITE_IMG_URL}/w500/${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
            />
            <div className="absolute hidden rounded bg-gray-900/90 p-1 group-hover:block">
              <ArrowsPointingOutIcon className="h-6 w-6" />
            </div>
          </NavLink>
          <div className="absolute top-1 right-1 hidden justify-between rounded bg-gray-900/90 p-1 group-hover:flex">
            <button
              name="favorite"
              value={movie.isInFavorites ? "true" : "false"}
              aria-label={
                movie.isInFavorites
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              onClick={() =>
                mutationListUpdate.mutate({ list: "favorites", movie })
              }
              className="p-1"
            >
              {movie.isInFavorites ? (
                <HeartIconSolid className="h-6 w-6 text-pink-400" />
              ) : (
                <HeartIconOutline className="h-6 w-6 text-pink-400" />
              )}
            </button>
            <button
              onClick={() =>
                mutationListUpdate.mutate({ list: "watchlist", movie })
              }
              className="p-1"
            >
              {movie.isInWatchlist ? (
                <BookmarkIconSolid className="h-6 w-6 text-yellow-400" />
              ) : (
                <BookmarkIconOutline className="h-6 w-6 text-yellow-400" />
              )}
            </button>
          </div>
          <div className="absolute bottom-0 m-1 hidden rounded bg-gray-900/90 p-1 text-sm group-hover:block">
            {movie.title}{" "}
            {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
