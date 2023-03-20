import { screen } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";
import App from "./App";
import renderWithProviders from "./tests/utils";

describe("App", () => {
  it("renders", async () => {
    window.history.pushState({}, "Trending", "/");

    renderWithProviders(<App />);

    await expect(screen.findByText("Movierama")).resolves.toBeInTheDocument();
  });
});
