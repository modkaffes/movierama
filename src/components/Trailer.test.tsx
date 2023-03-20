import { screen, waitFor } from "@testing-library/react";
import renderWithProviders from "@/tests/utils";
import { expect, test } from "vitest";
import Trailer from "./Trailer";

test("renders a trailer with correct src", async () => {
  renderWithProviders(<Trailer movieId={0} />, false);

  const iframe = await screen.findByTestId("iframe");

  await waitFor(() =>
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/key-0"
    )
  );
});
