import { Link, useRouteError } from "react-router-dom";

function ErrorPage({ status }: { status?: number }) {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h2 className="text-xl font-bold">Error</h2>
      <p className="text-red-600">{status}</p>
      <Link to="/" className="font-bold">
        Go back to home page
      </Link>
    </div>
  );
}

export default ErrorPage;
