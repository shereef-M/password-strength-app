const StrengthMeter = ({ analysis }) => {
  if (!analysis || !analysis.label) return null;

  const isVeryStrong = analysis.score === 4;

  return (
    <div className="mt-6 space-y-4 slide-down">
      {/* Bar and label */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-lg text-slate-400 font-medium">
            Password Strength
          </span>
          <span className={`text-lg font-bold ${analysis.textColor}`}>
            {analysis.label}
          </span>
        </div>

        {/* Strength bar */}
        <div
          className="h-4 bg-surface-3 rounded-full overflow-hidden
          border border-border"
        >
          <div
            className={`h-full rounded-full transition-all duration-700
              ease-out ${analysis.barColor} ${isVeryStrong ? "glow-pulse" : ""}`}
            style={{ width: `${analysis.percentage}%` }}
          />
        </div>

        {/* Score dots */}
        <div className="flex justify-between px-1">
          {["Very Weak", "Weak", "Fair", "Strong", "Very Strong"].map(
            (label, i) => (
              <span
                key={i}
                className={`text-xs transition-all duration-300 ${
                  i <= analysis.score
                    ? analysis.textColor + " font-medium"
                    : "text-slate-600"
                }`}
              >
                {label}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Crack time */}
      {analysis.crackTime && (
        <div
          className="flex items-center gap-3 bg-surface-3 border
          border-border rounded-xl px-4 py-3"
        >
          <span className="text-xl">⏱</span>
          <span className="text-base text-slate-400">
            Time to crack:{" "}
            <span className="text-slate-200 font-semibold text-lg">
              {analysis.crackTime}
            </span>
          </span>
        </div>
      )}

      {/* Very strong celebration */}
      {isVeryStrong && (
        <div
          className="bg-primary-glow border border-primary
          rounded-xl px-4 py-3 slide-down"
        >
          <p className="text-primary font-semibold text-base">
            🎉 Excellent password — this would take centuries to crack
          </p>
        </div>
      )}

      {/* Warning */}
      {analysis.feedback.warning && (
        <div
          className="bg-yellow-900/20 border border-yellow-700/40
          rounded-xl px-4 py-3 text-lg text-yellow-300"
        >
          ⚠️ {analysis.feedback.warning}
        </div>
      )}

      {/* Suggestions */}
      {analysis.feedback.suggestions.length > 0 && (
        <div className="space-y-2">
          {analysis.feedback.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-base text-slate-400"
            >
              <span className="text-primary text-lg mt-0.5">→</span>
              <span className="text-lg">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StrengthMeter;
