import { Link } from "react-router";

function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mb-6 mt-2 text-lg">Page not found</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;