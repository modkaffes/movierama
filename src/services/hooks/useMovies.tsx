import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import localforage from "localforage";

export async function getTrendingMovies() {
  const { data } = await api.get<MoviesResponse>("/trending/movie/day");

  return data;
}

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["movies", "trending", "day"],
    queryFn: getTrendingMovies,
  });
}

export async function searchMovies(query?: string) {
  if (!query) return Promise.resolve({ results: [] });

  const { data } = await api.get<MoviesResponse>(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  return data;
}

export function useSearchMovies(query?: string) {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
}

export async function getMovie(id: number) {
  const { data } = await api.get<Movie>(`/movie/${id}`);

  return data;
}

export function useMovie(id: number) {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovie(id),
  });
}

export async function getSavedList(list: "favorites" | "watchlist") {
  const savedList: Movie[] | [] | null = await localforage.getItem(list);

  return savedList || [];
}

export function useSavedList(list: "favorites" | "watchlist") {
  return useQuery({
    queryKey: [list],
    queryFn: () => getSavedList(list),
  });
}

export async function getMovieVideos(id: number) {
  const { data } = await api.get<VideosResponse>(`/movie/${id}/videos`);

  return data;
}

export function useMovieVideos(id: number) {
  return useQuery({
    queryKey: ["movies", id, "videos"],
    queryFn: () => getMovieVideos(id),
  });
}

export async function updateSavedList({
  list,
  movie,
}: {
  list: List;
  movie: Movie;
}) {
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
