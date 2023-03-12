import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "@/App";
import ErrorPage from "@/ErrorPage";
import Favorites from "@/routes/Favorites";
import Movie from "@/routes/Movie";
import Trending from "@/routes/Trending";
import Watchlist from "@/routes/Watchlist";
import "@/styles/index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Trending />, errorElement: <ErrorPage /> },
      { path: "movies/:movieId", element: <Movie /> },
      { path: "favorites", element: <Favorites /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "*", element: <ErrorPage status={404} /> },
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
