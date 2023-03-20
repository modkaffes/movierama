import MovieList from "@/components/MovieList";
import { useTrendingMovies } from "@/services/hooks/useMovies";

function Trending() {
  const { data: trendingMovies } = useTrendingMovies();

  return (
    <div>
      <h2 className="text-xl font-bold">Movies trending today</h2>
      {trendingMovies?.results.length > 0 ? (
        <MovieList movies={trendingMovies.results} />
      ) : (
        <p>No trending movies</p>
      )}
    </div>
  );
}

export default Trending;
