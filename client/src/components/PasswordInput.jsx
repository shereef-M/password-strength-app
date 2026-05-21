import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";
import { analysePassword, generatePassword } from "../utils/passwordUtils";
import StrengthMeter from "./StrengthMeter";

const PasswordInput = ({ onPasswordChange }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const result = analysePassword(password);
    setAnalysis(result);
    if (onPasswordChange) onPasswordChange(password);
  }, [password]);

  const handleGenerate = () => {
    const newPassword = generatePassword(16);
    setPassword(newPassword);
    setShowPassword(true);
  };

  return (
    <div className="w-full">
      <label className="block text-lg font-semibold text-slate-300 mb-3">
        Enter Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type or paste your password..."
          className="w-full bg-slate-700 border border-slate-600 rounded-xl
            px-5 py-4 pr-28 text-white text-xl placeholder-slate-500
            focus:outline-none focus:border-indigo-500 focus:ring-2
            focus:ring-indigo-500 transition-colors"
        />
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2
          flex items-center gap-2"
        >
          <button
            onClick={handleGenerate}
            title="Generate strong password"
            className="p-2 text-slate-400 hover:text-indigo-400
              transition-colors rounded-lg"
          >
            <FiRefreshCw size={20} />
          </button>
          <button
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
            className="p-2 text-slate-400 hover:text-indigo-400
              transition-colors rounded-lg"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
      </div>
      {password && <StrengthMeter analysis={analysis} />}
    </div>
  );
};

export default PasswordInput;
