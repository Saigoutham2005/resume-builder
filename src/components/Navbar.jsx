import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Resume<span className="text-yellow-300">Builder</span>
        </Link>

        <div className="space-x-6 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/editor"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Create Resume
          </Link>
          <Link
            to="/saved"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Saved Resumes
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
