import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import HistoryCard from "../components/HistoryCard";
import api from "../utils/api";
import { FiClock, FiTrash2 } from "react-icons/fi";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/history");
      setHistory(response.data.history);
    } catch (err) {
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/history/${id}`);
      setHistory(history.filter((record) => record._id !== id));
    } catch (err) {
      setError("Failed to delete record");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FiClock className="text-indigo-400" size={24} />
          <div>
            <h1 className="text-2xl font-bold text-white">Check History</h1>
            <p className="text-slate-400 text-sm">
              Welcome back, {user?.username}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="bg-red-900/30 border border-red-700/50 rounded-lg
            px-4 py-3 text-red-300 text-sm mb-4"
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-400 py-12">
            Loading history...
          </div>
        )}

        {/* Empty state */}
        {!loading && history.length === 0 && (
          <div className="text-center py-12">
            <FiClock className="text-slate-600 mx-auto mb-3" size={40} />
            <p className="text-slate-400">No checks yet</p>
            <p className="text-slate-500 text-sm mt-1">
              Go to the home page and check a password to see it here
            </p>
          </div>
        )}

        {/* History list */}
        {!loading && history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">
                {history.length} record{history.length !== 1 ? "s" : ""}
              </span>
            </div>
            {history.map((record) => (
              <HistoryCard
                key={record._id}
                record={record}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
