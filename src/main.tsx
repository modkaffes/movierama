import { StrictMode, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "@/App";
import "@/styles/index.css";

const NotFoundRoute = lazy(async () => import("@/routes/NotFound"));
const TrendingRoute = lazy(async () => import("@/routes/Trending"));
const MovieRoute = lazy(async () => import("@/routes/Movie"));
const FavoritesRoute = lazy(async () => import("@/routes/Favorites"));
const WatchlistRoute = lazy(async () => import("@/routes/Watchlist"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "*", element: <NotFoundRoute /> },
      { index: true, element: <TrendingRoute /> },
      { path: "movies/:movieId", element: <MovieRoute /> },
      { path: "favorites", element: <FavoritesRoute /> },
      { path: "watchlist", element: <WatchlistRoute /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
