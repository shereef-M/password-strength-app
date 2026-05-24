import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiShield, FiMail, FiLock } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-surface flex items-center
      justify-center px-4 page-fade"
    >
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div
              className="bg-primary-glow border border-border
              p-4 rounded-full shadow-glow"
            >
              <FiShield className="text-primary" size={40} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 text-xl">
            Sign in to your PassGuard account
          </p>
        </div>

        {/* Form card */}
        <div
          className="bg-surface-card rounded-2xl border border-border
          p-10 shadow-card"
        >
          {/* Error message */}
          {error && (
            <div
              className="bg-red-900/20 border border-red-700/40
              rounded-xl px-5 py-4 text-red-300 text-lg mb-6 slide-down"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label
                className="block text-lg font-semibold
                text-slate-300 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2
                    text-slate-500"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-surface-input border-2 border-border
                    rounded-xl pl-12 pr-4 py-4 text-white text-lg
                    placeholder-slate-600 focus:outline-none
                    focus:border-primary transition-all duration-300
                    input-focus"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                className="block text-lg font-semibold
                text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2
                    text-slate-500"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full bg-surface-input border-2 border-border
                    rounded-xl pl-12 pr-4 py-4 text-white text-lg
                    placeholder-slate-600 focus:outline-none
                    focus:border-primary transition-all duration-300
                    input-focus"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark
                disabled:bg-surface-3 disabled:text-slate-600
                text-white text-xl font-semibold py-4 rounded-xl
                transition-all duration-200 mt-2 btn-press
                shadow-glow-sm hover:shadow-glow"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-5 h-5 border-2 border-white
                    border-t-transparent rounded-full animate-spin"
                  />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Register link */}
        <p className="text-center text-slate-400 text-lg mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-light
              font-semibold transition-colors duration-200"
          >
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
