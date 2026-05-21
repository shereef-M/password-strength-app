import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiShield, FiMail, FiLock, FiUser } from "react-icons/fi";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-indigo-600/20 p-3 rounded-full">
              <FiShield className="text-indigo-400" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Sign in to your PassGuard account
          </p>
        </div>

        {/* Form card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10">
          {error && (
            <div
              className="bg-red-900/30 border border-red-700/50 rounded-lg
              px-4 py-3 text-red-300 text-sm mb-4"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-3 top-1/2 -translate-y-1/2
                  text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourname"
                  required
                  minLength={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl
  pl-12 pr-4 py-4 text-white text-lg placeholder-slate-500
  focus:outline-none focus:border-indigo-500 focus:ring-2
  focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label className="block text-lg font-semibold text-slate-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2
                  text-slate-400"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg
                    pl-10 pr-4 py-3 text-white placeholder-slate-500
                    focus:outline-none focus:border-indigo-500 focus:ring-1
                    focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2
                  text-slate-400"
                  size={16}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg
                    pl-10 pr-4 py-3 text-white placeholder-slate-500
                    focus:outline-none focus:border-indigo-500 focus:ring-1
                    focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700
  disabled:text-slate-500 text-white text-xl font-semibold py-4 rounded-xl
  transition-colors mt-3"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center text-slate-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
