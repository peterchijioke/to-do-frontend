import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className="w-full h-screen flex items-center justify-center text-amber-950">
    <div className=" grid gap-1">
      <div className="text-center">
        <h1 className="font-bold text-4xl">404</h1>
        <p className="text-xl mt-2">Page not found</p>
      </div>
      <Link to="/" className="text-white bg-amber-950 py-3 px-4">
        Go back to Login
      </Link>
    </div>
  </div>
);
