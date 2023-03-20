import {
  BookmarkIcon as BookmarkIconOutline,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateSavedList } from "@/services/hooks/useMovies";

function ListUpdateActions({
  isInFavorites,
  isInWatchlist,
  movie,
  withText,
}: {
  isInFavorites?: boolean;
  isInWatchlist?: boolean;
  movie: Movie;
  withText?: boolean;
}) {
  const queryClient = useQueryClient();

  const mutationListUpdate = useMutation({
    mutationFn: updateSavedList,
    onSuccess: (_, { list }) =>
      queryClient.invalidateQueries({ queryKey: [list] }),
  });

  return (
    <>
      <button
        className="flex p-1"
        name="favorite"
        value={isInFavorites ? "true" : "false"}
        aria-label={
          isInFavorites ? "Remove from favorites" : "Add to favorites"
        }
        onClick={() => {
          mutationListUpdate.mutate({ list: "favorites", movie });
        }}
      >
        {isInFavorites ? (
          <>
            <HeartIconSolid className="h-6 w-6 text-pink-400" />
            {withText && <span className="ml-2">Remove from favorites</span>}
          </>
        ) : (
          <>
            <HeartIconOutline className="h-6 w-6 text-pink-400" />
            {withText && <span className="ml-2">Add to favorites</span>}
          </>
        )}
      </button>
      <button
        className="flex p-1"
        name="watchlist"
        value={isInWatchlist ? "true" : "false"}
        aria-label={
          isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
        }
        onClick={() => mutationListUpdate.mutate({ list: "watchlist", movie })}
      >
        {isInWatchlist ? (
          <>
            <BookmarkIconSolid className="h-6 w-6 text-yellow-400" />
            {withText && <span className="ml-2">Remove from watchlist</span>}
          </>
        ) : (
          <>
            <BookmarkIconOutline className="h-6 w-6 text-yellow-400" />
            {withText && <span className="ml-2">Add to watchlist</span>}
          </>
        )}
      </button>
    </>
  );
}

export default ListUpdateActions;
