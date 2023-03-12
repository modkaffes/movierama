import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/api/movies";
import MovieList from "@/components/MovieList";

function Trending() {
  const { data: trendingMovies } = useQuery({
    queryKey: ["movies", "trending", "week"],
    queryFn: getTrendingMovies,
  });

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
