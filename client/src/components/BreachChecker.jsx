import useExplainBreach from "../hooks/useExplainBreach";
import { useState } from "react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";
import SHA1 from "crypto-js/sha1";
import api from "../utils/api";

const BreachChecker = ({ password }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    explain,
    status: explainStatus,
    result: explanation,
    error: explainError,
  } = useExplainBreach();

  const checkBreach = async () => {
    console.log("password value at click:", password);
    if (!password) {
      setError("Please enter a password first");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const hash = SHA1(password).toString().toUpperCase();
      const response = await api.post("/password/check-breach", { hash });
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

  // ...rest of the component stays exactly the same

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
          {result.breachFound && (
            <div className="mt-4">
              <button
                onClick={() => explain("Compromised Password", result.message)}
                disabled={
                  explainStatus === "loading" || explainStatus === "polling"
                }
                className="w-full bg-surface-3 hover:bg-surface-4 text-slate-200
        text-lg font-medium py-3 px-6 rounded-xl transition-all duration-200
        flex items-center justify-center gap-2 border border-border"
              >
                {explainStatus === "polling" || explainStatus === "loading" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                    <span>Generating explanation...</span>
                  </div>
                ) : (
                  <span>Explain this in plain English</span>
                )}
              </button>

              {explanation && (
                <div className="mt-3 bg-surface-2 border border-border rounded-xl px-5 py-4 text-slate-300 text-base leading-relaxed whitespace-pre-wrap slide-down">
                  {explanation}
                </div>
              )}

              {explainError && (
                <p className="mt-2 text-red-400 text-sm">{explainError}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BreachChecker;
