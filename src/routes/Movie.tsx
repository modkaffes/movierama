import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieVideos } from "@/api/movies";

function Movie() {
  const params = useParams();
  const { movieId } = params;

  const { data: movie } = useQuery({
    queryKey: ["movies", movieId],
    queryFn: () => getMovie(Number(movieId)),
  });

  const { data: movieVideos } = useQuery({
    queryKey: ["movies", movieId, "videos"],
    queryFn: () => getMovieVideos(Number(movieId)),
  });

  return (
    <>
      {movie && (
        <div
          className="flex flex-col gap-4 rounded-lg bg-cover bg-center bg-no-repeat p-4 text-white md:flex-row md:gap-8 md:p-8"
          style={{
            backgroundImage: `linear-gradient(#000, rgba(0, 0, 0, 0.5)), url(${
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
              <em className="block text-sm">{movie.tagline}</em>
              <p className="mt-4">{movie.overview}</p>
            </div>
            {movieVideos?.results.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold">Trailer</h2>
                <ul className="mt-2 flex flex-wrap gap-4">
                  {movieVideos.results.map((video: Video) => {
                    if (video.type === "Trailer") {
                      return (
                        <li
                          key={video.id}
                          className="overflow-hidden rounded-md"
                        >
                          <iframe
                            title={video.name}
                            src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                            allowFullScreen
                          />
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Movie;
