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
      <button
        onClick={checkBreach}
        disabled={loading || !password}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700
          disabled:text-slate-500 text-white text-xl font-semibold
          py-4 px-6 rounded-xl transition-colors flex items-center
          justify-center gap-3"
      >
        {loading ? (
          <span>Checking breaches...</span>
        ) : (
          <>
            <FiShield size={22} />
            <span>Check for Data Breaches</span>
          </>
        )}
      </button>

      {error && (
        <div
          className="bg-red-900/30 border border-red-700/50 rounded-xl
          px-5 py-4 text-red-300 text-base"
        >
          {error}
        </div>
      )}

      {result && (
        <div
          className={`rounded-xl px-5 py-5 border ${
            result.breachFound
              ? "bg-red-900/30 border-red-700/50"
              : "bg-green-900/30 border-green-700/50"
          }`}
        >
          <div className="flex items-start gap-4">
            {result.breachFound ? (
              <FiAlertTriangle
                className="text-red-400 mt-1 shrink-0"
                size={26}
              />
            ) : (
              <FiShield className="text-green-400 mt-1 shrink-0" size={26} />
            )}
            <div>
              <p
                className={`font-bold text-xl ${
                  result.breachFound ? "text-red-300" : "text-green-300"
                }`}
              >
                {result.breachFound
                  ? "Password Compromised"
                  : "Password Not Found"}
              </p>
              <p className="text-base mt-2 text-slate-300 leading-relaxed">
                {result.message}
              </p>
            </div>
          </div>
          {result.historySaved && (
            <p
              className="text-sm text-slate-500 mt-4 pt-4
              border-t border-slate-700"
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
