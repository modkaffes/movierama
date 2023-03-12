type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

interface Movie extends TMDBMovie {
  isInFavorites?: boolean;
  isInWatchlist?: boolean;
}

type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
};
