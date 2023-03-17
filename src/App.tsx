import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <div className="mx-auto max-w-7xl px-2 pb-20 sm:px-4 lg:px-8">
      <Navbar />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{" "}
                <pre className="text-red-600" style={{ whiteSpace: "normal" }}>
                  {error.message}
                </pre>
                <button
                  onClick={() => resetErrorBoundary()}
                  className="mt-4 inline-flex gap-2"
                >
                  <ArrowPathIcon className="h-6 w-6" />
                  Try again
                </button>
              </div>
            )}
            onReset={reset}
          >
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

export default App;
