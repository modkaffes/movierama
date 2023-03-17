import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function NotFound() {
  return (
    <div>
      <h2 className="text-xl font-bold text-red-600">Error 404</h2>
      <Link to="/" className="mt-4 inline-flex font-bold">
        <ChevronLeftIcon className="h-6 w-6" />
        Go back to home page
      </Link>
    </div>
  );
}

export default NotFound;
