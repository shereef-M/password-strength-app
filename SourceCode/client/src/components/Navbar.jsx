import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiShield,
  FiLogOut,
  FiClock,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-surface-2 border-b border-border px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Logo — pushed to far left */}
        <Link
          to="/"
          className="flex items-center gap-3 text-primary font-bold
            text-3xl hover:text-primary-light transition-colors duration-200"
        >
          <FiShield size={34} />
          <span>PassGuard</span>
        </Link>

        {/* Navigation — pushed to far right */}
        <div className="flex items-center gap-5 ml-auto">
          {user ? (
            <>
              {/* Hello name — big and bold */}
              <span
                className="text-emerald-300 text-xl font-bold
                hidden sm:block tracking-wide"
              >
                Hello, {user.username} 👋
              </span>

              {/* History link */}
              <Link
                to="/history"
                className="flex items-center gap-2 text-slate-300
                  hover:text-primary transition-colors duration-200
                  text-lg font-medium"
              >
                <FiClock size={22} />
                <span className="hidden sm:block">History</span>
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-surface-3
                  border border-border hover:border-red-500
                  hover:text-red-400 text-slate-300 px-5 py-2.5
                  rounded-xl text-lg font-medium transition-all
                  duration-200 btn-press"
              >
                <FiLogOut size={20} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login button */}
              <Link
                to="/login"
                className="flex items-center gap-2 border border-border
                  hover:border-primary text-slate-300 hover:text-primary
                  px-5 py-2.5 rounded-xl text-lg font-medium
                  transition-all duration-200 btn-press"
              >
                <FiLogIn size={20} />
                <span>Login</span>
              </Link>

              {/* Sign up button */}
              <Link
                to="/register"
                className="flex items-center gap-2 bg-primary
                  hover:bg-primary-dark text-white px-6 py-2.5
                  rounded-xl text-lg font-semibold transition-all
                  duration-200 btn-press shadow-glow-sm"
              >
                <FiUserPlus size={20} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
