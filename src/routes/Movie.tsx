import { useParams } from "react-router-dom";
import ListUpdateActions from "@/components/ListUpdateActions";
import Trailer from "@/components/Trailer";
import { useMovie, useSavedList } from "@/services/hooks/useMovies";

function Movie() {
  const params = useParams();
  const { movieId } = params;
  const movieIdNo = Number(movieId);

  const { data: movie } = useMovie(movieIdNo);
  const { data: favorites } = useSavedList("favorites");
  const { data: watchlist } = useSavedList("watchlist");

  const movieWithListInfo = movie && {
    ...movie,
    isInFavorites: favorites?.find(
      (favorite: Movie) => favorite.id === movieIdNo
    ),
    isInWatchlist: watchlist?.find(
      (watchlistItem: Movie) => watchlistItem.id === movieIdNo
    ),
  };

  return (
    <>
      {movieWithListInfo && (
        <div
          className="flex flex-col gap-4 rounded-lg bg-cover bg-center bg-no-repeat p-4 text-white lg:flex-row lg:gap-8 lg:p-8"
          style={{
            backgroundImage: `linear-gradient(#000, rgba(0, 0, 0, 0.75)), url(${
              import.meta.env.VITE_IMG_URL
            }/w1280/${movie.backdrop_path})`,
          }}
        >
          <div className="max-w-sm flex-shrink-0">
            <img
              src={`${import.meta.env.VITE_IMG_URL}/w500/${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
              className="h-auto w-full rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="inline text-2xl font-bold">{movie.title}</h2>
              <span className="ml-2">
                {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
              </span>
              {movie.tagline && (
                <span className="block text-sm italic">{movie.tagline}</span>
              )}
              <p className="mt-4">{movie.overview}</p>
              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:gap-8">
                <ListUpdateActions
                  movie={movieWithListInfo}
                  isInFavorites={movieWithListInfo.isInFavorites}
                  isInWatchlist={movieWithListInfo.isInWatchlist}
                  withText={true}
                />
              </div>
            </div>
            <Trailer movieId={Number(movieId)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Movie;
