import { FiAlertTriangle, FiShield, FiTrash2, FiClock } from "react-icons/fi";

const HistoryCard = ({ record, onDelete }) => {
  const date = new Date(record.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
          {/* Breach result and timestamp */}
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span
              className={`text-lg font-semibold ${
                record.breachFound ? "text-red-400" : "text-primary"
              }`}
            >
              {record.breachFound
                ? `⚠️ Found in ${record.breachCount.toLocaleString()} breaches`
                : "✅ Not breached"}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
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
