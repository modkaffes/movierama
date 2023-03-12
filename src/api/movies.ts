import axios from "axios";
import localforage from "localforage";

function apiWrapper(endpoint: string) {
  return axios
    .get(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
    .then((res) => res.data);
}

export function getTrendingMovies() {
  return apiWrapper("/trending/movie/day");
}

export function searchMovies(query: string) {
  return apiWrapper(`/search/movie?query=${encodeURIComponent(query)}`);
}

export function getMovie(id: number) {
  return id && apiWrapper(`/movie/${id}`);
}

export function getMovieVideos(id: number) {
  return id && apiWrapper(`/movie/${id}/videos`);
}

export async function getSavedList(list: "favorites" | "watchlist") {
  const savedList: Movie[] | [] | null = await localforage.getItem(list);

  if (!savedList) {
    return [];
  }

  return savedList;
}

export async function updateSavedList(
  list: "favorites" | "watchlist",
  movie: Movie
) {
  const savedList: Movie[] | [] | null = await localforage.getItem(list);

  if (savedList && savedList?.findIndex((m) => m.id === movie.id) > -1) {
    return localforage.setItem(
      list,
      savedList.filter((m) => m.id !== movie.id)
    );
  } else {
    return localforage.setItem(list, [...(savedList || []), movie]);
  }
}
