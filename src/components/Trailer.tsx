import { useMovieVideos } from "@/services/hooks/useMovies";

function Trailer({ movieId }: { movieId: Movie["id"] }) {
  const { data: movieVideos } = useMovieVideos(Number(movieId));

  const latestTrailer = movieVideos?.results.find(
    (video) => video.type === "Trailer"
  );

  return latestTrailer ? (
    <div className="mt-8">
      <h2 className="text-lg font-bold">Trailer</h2>
      <div className="mt-2 overflow-hidden rounded-md">
        <iframe
          data-testid="iframe"
          title={latestTrailer.name}
          src={`https://www.youtube-nocookie.com/embed/${latestTrailer.key}`}
          allowFullScreen
        />
      </div>
    </div>
  ) : null;
}

export default Trailer;
