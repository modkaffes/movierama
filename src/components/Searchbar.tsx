import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useSearchMovies } from "@/services/hooks/useMovies";
import { useDebouncedValue } from "rooks";

function Searchbar() {
  const [query, setQuery] = useState<string>();
  const [debouncedQuery] = useDebouncedValue(query, 250);

  const { data } = useSearchMovies(debouncedQuery);

  return (
    <div className="relative flex min-w-[340px] items-center md:ml-auto">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <form
        role="search"
        className="relative block w-full text-white focus-within:text-gray-400"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          aria-label="Search movies"
          className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Search movies"
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      {debouncedQuery && data?.results.length > 0 && (
        <ul className="absolute top-full z-50 flex max-h-[600px] w-full flex-col divide-y overflow-y-auto rounded-md border border-gray-700 bg-gray-800 text-sm">
          {data.results?.map((movie: Movie) => (
            <li key={movie.id} className="border-gray-900">
              <NavLink
                to={`/movies/${movie.id}`}
                onClick={() => setQuery("")}
                className="flex items-center gap-2 p-1 hover:bg-gray-700 focus:bg-gray-700"
              >
                <div className="w-10 flex-shrink-0">
                  {movie.poster_path ? (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}/w92/${
                        movie.poster_path
                      }`}
                      alt={`Poster for ${movie.title}`}
                      className="w-full rounded-sm"
                    />
                  ) : (
                    <div className="h-14 w-10 rounded-sm bg-gray-600" />
                  )}
                </div>
                <span>
                  {movie.title}{" "}
                  {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {debouncedQuery && data?.results.length === 0 && (
        <div className="absolute top-full w-full rounded-md border border-gray-700 p-4 text-sm">
          <p>No movies found with this title</p>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
