import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/api/movies";
import { useDebouncedValue } from "rooks";

function Searchbar() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebouncedValue(query, 250);

  const { data } = useQuery({
    queryKey: ["movies", "search", debouncedQuery],
    queryFn: () => debouncedQuery && searchMovies(debouncedQuery),
  });

  // Focus on search input when pressing ctrl + k
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        document.getElementById("search")?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex min-w-[340px] items-center md:ml-auto">
      <form role="search" className="block w-full">
        <input
          type="search"
          name="search"
          id="search"
          aria-label="Search for a movie"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder="Search for a movie"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="absolute inset-y-0 right-0 hidden py-1.5 pr-1.5 sm:flex">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ^K
          </kbd>
        </div>
      </form>
      {debouncedQuery && data?.results.length > 0 && (
        <ul className="absolute top-full z-50 flex max-h-[600px] w-full flex-col overflow-y-auto rounded-md border border-gray-700 bg-gray-800 text-sm">
          {data.results?.map((movie: Movie) => (
            <li key={movie.id}>
              <NavLink
                to={`/movies/${movie.id}`}
                onClick={() => setQuery("")}
                className="flex gap-2 p-1 hover:bg-gray-700 focus:bg-gray-700 "
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
                    <div className="h-10 w-10 bg-gray-200" />
                  )}
                </div>
                {movie.title}{" "}
                {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {debouncedQuery && data?.results.length === 0 && (
        <div className="absolute top-full w-full rounded-md border ">
          <p>No movies found with this title</p>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
