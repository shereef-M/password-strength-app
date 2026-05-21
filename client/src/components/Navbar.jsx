import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiShield, FiLogOut, FiClock, FiLogIn } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-indigo-400
          font-bold text-3xl hover:text-indigo-300 transition-colors"
        >
          <FiShield size={32} />
          <span>PassGuard</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-slate-300 text-lg font-medium hidden sm:block">
                Hello, {user.username}
              </span>
              <Link
                to="/history"
                className="flex items-center gap-2 text-slate-300
                  hover:text-white transition-colors text-lg font-medium"
              >
                <FiClock size={20} />
                <span className="hidden sm:block">History</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-300
                  hover:text-red-400 transition-colors text-lg font-medium"
              >
                <FiLogOut size={20} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-slate-300
                  hover:text-white transition-colors text-lg font-medium"
              >
                <FiLogIn size={20} />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white
                  px-6 py-3 rounded-xl text-lg font-medium transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
