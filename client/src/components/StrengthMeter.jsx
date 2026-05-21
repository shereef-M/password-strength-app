const StrengthMeter = ({ analysis }) => {
  if (!analysis || !analysis.label) return null

  return (
    <div className="mt-5 space-y-4">

      {/* Bar and label */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-base text-slate-400 font-medium">
            Password Strength
          </span>
          <span className={`text-base font-semibold ${analysis.textColor}`}>
            {analysis.label}
          </span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${analysis.barColor}`}
            style={{ width: `${analysis.percentage}%` }}
          />
        </div>
      </div>

      {/* Crack time */}
      {analysis.crackTime && (
        <div className="flex items-center gap-2 text-base text-slate-400">
          <span>⏱</span>
          <span>
            Time to crack:{' '}
            <span className="text-slate-200 font-medium">
              {analysis.crackTime}
            </span>
          </span>
        </div>
      )}

      {/* Warning */}
      {analysis.feedback.warning && (
        <div className="bg-yellow-900/30 border border-yellow-700/50
          rounded-xl px-4 py-3 text-base text-yellow-300">
          ⚠️ {analysis.feedback.warning}
        </div>
      )}

      {/* Suggestions */}
      {analysis.feedback.suggestions.length > 0 && (
        <div className="space-y-2">
          {analysis.feedback.suggestions.map((suggestion, index) => (
            <div key={index}
              className="flex items-start gap-2 text-base text-slate-400">
              <span className="text-indigo-400 mt-0.5 text-lg">→</span>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StrengthMeter