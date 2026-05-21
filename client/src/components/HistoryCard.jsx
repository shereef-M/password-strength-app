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
    "Very Strong": "text-green-400",
  };

  return (
    <div
      className="bg-slate-800 border border-slate-700 rounded-xl p-4
      flex items-start justify-between gap-4"
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {record.breachFound ? (
          <FiAlertTriangle className="text-red-400 mt-0.5 shrink-0" size={18} />
        ) : (
          <FiShield className="text-green-400 mt-0.5 shrink-0" size={18} />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-mono text-sm">
              {record.maskedPassword}
            </span>
            <span
              className={`text-xs font-medium ${
                strengthColors[record.strengthLabel] || "text-slate-400"
              }`}
            >
              {record.strengthLabel}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span
              className={`text-xs ${
                record.breachFound ? "text-red-400" : "text-green-400"
              }`}
            >
              {record.breachFound
                ? `Found in ${record.breachCount.toLocaleString()} breaches`
                : "Not breached"}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <FiClock size={10} />
              {date}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(record._id)}
        className="text-slate-500 hover:text-red-400 transition-colors
          shrink-0 p-1"
        title="Delete record"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
};

export default HistoryCard;
