import type { PropsWithChildren, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  },
});

export const queryClientWrapper = ({
  children,
}: PropsWithChildren): ReactElement => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default function renderWithProviders(
  ui: ReactElement,
  includeRouter = true
): void {
  render(ui, {
    wrapper: ({ children }: PropsWithChildren): ReactElement => (
      <QueryClientProvider client={queryClient}>
        {includeRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </QueryClientProvider>
    ),
  });
}
