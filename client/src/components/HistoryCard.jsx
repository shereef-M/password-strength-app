import { FiAlertTriangle, FiShield, FiTrash2, FiClock } from "react-icons/fi";

const HistoryCard = ({ record, onDelete }) => {
  const date = new Date(record.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const strengthColors = {
    "Very Weak": "text-red-400",
    Weak: "text-orange-400",
    Fair: "text-yellow-400",
    Strong: "text-blue-400",
    "Very Strong": "text-primary",
  };

  const strengthBg = {
    "Very Weak": "bg-red-900/20 border-red-700/40",
    Weak: "bg-orange-900/20 border-orange-700/40",
    Fair: "bg-yellow-900/20 border-yellow-700/40",
    Strong: "bg-blue-900/20 border-blue-700/40",
    "Very Strong": "bg-primary-glow border-primary",
  };

  return (
    <div
      className="bg-surface-card border border-border rounded-xl
      p-5 flex items-start justify-between gap-4 hover:border-border-hover
      transition-all duration-200 slide-down"
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Icon */}
        <div
          className={`p-2 rounded-lg border ${
            record.breachFound
              ? "bg-red-900/20 border-red-700/40"
              : "bg-primary-glow border-primary"
          }`}
        >
          {record.breachFound ? (
            <FiAlertTriangle className="text-red-400" size={20} />
          ) : (
            <FiShield className="text-primary" size={20} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Masked password and strength label */}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="text-white font-mono text-lg font-semibold">
              {record.maskedPassword}
            </span>
            <span
              className={`text-sm font-semibold px-2 py-0.5
              rounded-full border ${
                strengthBg[record.strengthLabel] || "bg-surface-3 border-border"
              } ${strengthColors[record.strengthLabel] || "text-slate-400"}`}
            >
              {record.strengthLabel}
            </span>
          </div>

          {/* Breach result and timestamp */}
          <div className="flex items-center gap-4 flex-wrap">
            <span
              className={`text-base font-medium ${
                record.breachFound ? "text-red-400" : "text-primary"
              }`}
            >
              {record.breachFound
                ? `⚠️ Found in ${record.breachCount.toLocaleString()} breaches`
                : "✅ Not breached"}
            </span>
            <span
              className="flex items-center gap-1.5
              text-sm text-slate-500"
            >
              <FiClock size={12} />
              {date}
            </span>
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(record._id)}
        className="p-2 text-slate-600 hover:text-red-400
          hover:bg-red-900/20 rounded-lg transition-all
          duration-200 btn-press shrink-0"
        title="Delete record"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
};

export default HistoryCard;
