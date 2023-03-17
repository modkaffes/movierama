import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "@/App";
import Favorites from "@/routes/Favorites";
import Movie from "@/routes/Movie";
import NotFound from "@/routes/NotFound";
import Trending from "@/routes/Trending";
import Watchlist from "@/routes/Watchlist";
import "@/styles/index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, element: <Trending /> },
      { path: "movies/:movieId", element: <Movie /> },
      { path: "favorites", element: <Favorites /> },
      { path: "watchlist", element: <Watchlist /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
