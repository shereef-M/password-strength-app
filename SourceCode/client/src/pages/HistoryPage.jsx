import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import HistoryCard from "../components/HistoryCard";
import api from "../utils/api";
import { FiClock, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-surface px-4 py-10 page-fade">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="bg-primary-glow border border-border
            p-3 rounded-xl shadow-glow-sm"
          >
            <FiClock className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Check History</h1>
            <p className="text-slate-400 text-lg mt-0.5">
              Welcome back,{" "}
              <span className="text-primary font-semibold">
                {user?.username}
              </span>
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="bg-red-900/20 border border-red-700/40
            rounded-xl px-5 py-4 text-red-300 text-lg mb-6"
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3">
            <div
              className="w-6 h-6 border-2 border-primary
              border-t-transparent rounded-full animate-spin"
            />
            <span className="text-slate-400 text-lg">Loading history...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && history.length === 0 && (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <div
                className="bg-surface-2 border border-border
                p-5 rounded-full"
              >
                <FiClock className="text-slate-600" size={40} />
              </div>
            </div>
            <p className="text-slate-300 text-xl font-semibold mb-2">
              No checks yet
            </p>
            <p className="text-slate-500 text-lg mb-6">
              Go to the home page and check a password to see it here
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary
                hover:bg-primary-dark text-white px-6 py-3 rounded-xl
                text-lg font-semibold transition-all duration-200
                btn-press shadow-glow-sm"
            >
              <FiShield size={20} />
              Check a password
            </Link>
          </div>
        )}

        {/* History list */}
        {!loading && history.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-lg">
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
