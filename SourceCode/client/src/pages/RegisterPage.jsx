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
          <h1 className="text-4xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-slate-400 text-xl">
            Start checking your passwords for free
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
            {/* Username field */}
            <div>
              <label
                className="block text-lg font-semibold
                text-slate-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2
                    text-slate-500"
                  size={20}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourname"
                  required
                  minLength={3}
                  className="w-full bg-surface-input border-2 border-border
                    rounded-xl pl-12 pr-4 py-4 text-white text-lg
                    placeholder-slate-600 focus:outline-none
                    focus:border-primary transition-all duration-300
                    input-focus"
                />
              </div>
            </div>

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
                  placeholder="At least 6 characters"
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
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center text-slate-400 text-lg mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary-light
              font-semibold transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
