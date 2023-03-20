type TMDBMovie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  tagline: string;
};

interface Movie extends TMDBMovie {
  isInFavorites?: boolean;
  isInWatchlist?: boolean;
}

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type List = "favorites" | "watchlist";

type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
};

type VideosResponse = {
  id: number;
  results: Video[];
};
