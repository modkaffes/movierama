import { renderHook, waitFor } from "@testing-library/react";
import { queryClientWrapper } from "@/tests/utils";
import { useTrendingMovies } from "./useMovies";

describe("useTrendingMovies", () => {
  it("should return trending movies successfully", async () => {
    const { result } = renderHook(() => useTrendingMovies(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() =>
      expect(result.current.data?.results[0]).toHaveProperty("title")
    );
  });
});
