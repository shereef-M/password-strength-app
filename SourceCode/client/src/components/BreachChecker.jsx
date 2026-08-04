import { useState } from "react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";
import api from "../utils/api";

const BreachChecker = ({ password }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkBreach = async () => {
    if (!password) {
      setError("Please enter a password first");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post("/password/check-breach", { password });
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to check breach. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Check button */}
      <button
        onClick={checkBreach}
        disabled={loading || !password}
        className="w-full bg-primary hover:bg-primary-dark
          disabled:bg-surface-3 disabled:text-slate-600
          disabled:border disabled:border-border
          text-white text-xl font-semibold py-4 px-6
          rounded-xl transition-all duration-200
          flex items-center justify-center gap-3
          btn-press shadow-glow-sm hover:shadow-glow"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div
              className="w-5 h-5 border-2 border-white
              border-t-transparent rounded-full animate-spin"
            />
            <span>Checking breaches...</span>
          </div>
        ) : (
          <>
            <FiShield size={24} />
            <span>Check for Data Breaches</span>
          </>
        )}
      </button>

      {/* Error message */}
      {error && (
        <div
          className="bg-red-900/20 border border-red-700/40
          rounded-xl px-5 py-4 text-red-300 text-lg slide-down"
        >
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className={`rounded-xl px-5 py-5 border slide-down ${
            result.breachFound
              ? "bg-red-900/20 border-red-700/40"
              : "bg-primary-glow border-primary"
          }`}
        >
          <div className="flex items-start gap-4">
            {result.breachFound ? (
              <FiAlertTriangle
                className="text-red-400 mt-1 shrink-0"
                size={28}
              />
            ) : (
              <FiShield className="text-primary mt-1 shrink-0" size={28} />
            )}
            <div>
              <p
                className={`font-bold text-xl mb-1 ${
                  result.breachFound ? "text-red-300" : "text-primary"
                }`}
              >
                {result.breachFound
                  ? "Password Compromised"
                  : "Password Not Found"}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                {result.message}
              </p>
            </div>
          </div>

          {/* History saved notice */}
          {result.historySaved && (
            <p
              className="text-base text-slate-500 mt-4 pt-4
              border-t border-border"
            >
              ✓ This check has been saved to your history
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BreachChecker;
