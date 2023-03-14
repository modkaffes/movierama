# Movierama

## Description

This is a movie exploration app. It allows you to browse movies and add them to your watchlist or favorites.

<img src="https://user-images.githubusercontent.com/1829897/224972527-e94040aa-b9e8-4cab-a879-821370c71763.png" width="390" height="844" alt="Movierama app screenshot in iPhone 12 Pro screen" />

## Technologies

This project was developed with the following technologies:

- [TypeScript][ts]
- [React][react]
- [Vite][vite]
- [Vitest][vitest]
- [Tanstack Query][tanstack-query]
- [Tailwind][tailwindcss]
- [TMDB API][tmdb]

## How To Use

To clone and run this application, you will need [Git][git] and [Node.js][node] installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/modkaffes/movierama.git

# Copy the .env.example file to .env.development.local and add your TMDB API Token
cp .env.example .env.development.local

# Install dependencies using your favorite package manager, eg.
$ pnpm install

# Start server
$ pnpm dev

# Run tests
$ pnpm test
```

## License

This project is under the MIT license. See the [LICENSE](https://github.com/modkaffes/movierama/blob/main/LICENSE) for details.

Made with care by [Modestos Kaffes](https://modkaffes.com).

[git]: https://git-scm.com
[node]: https://nodejs.org/
[ts]: https://www.typescriptlang.org/
[react]: https://reactjs.org
[vite]: https://vitejs.dev/
[vitest]: https://vitest.dev/
[tanstack-query]: https://tanstack.com/query/v4/docs/react/overview
[tailwindcss]: https://tailwindcss.com/
[tmdb]: https://developers.themoviedb.org/3
