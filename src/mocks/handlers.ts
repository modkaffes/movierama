import { rest } from "msw";

export const handlers = [
  rest.get("/trending/movie/day", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            id: 0,
            title: "Movie 0",
            overview: "Movie 0 overview",
            backdrop_path: "/backdrop-0.jpg",
            poster_path: "/poster-0.jpg",
          },
        ],
        total_pages: 1,
        total_results: 1,
      })
    );
  }),
  rest.get("/movie/:id/videos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 0,
        results: [
          {
            key: "key-0",
            name: "Video 0",
            site: "YouTube",
            type: "Trailer",
          },
        ],
      })
    );
  }),
];
