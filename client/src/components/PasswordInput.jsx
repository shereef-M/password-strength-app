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
      <label className="block text-xl font-semibold text-slate-200 mb-3">
        Enter Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type or paste your password..."
          className="w-full bg-surface-input border-2 border-border
            rounded-xl px-5 py-4 pr-28 text-white text-xl
            placeholder-slate-600 focus:outline-none
            focus:border-primary transition-all duration-300
            input-focus"
        />

        <div
          className="absolute right-3 top-1/2 -translate-y-1/2
          flex items-center gap-1"
        >
          {/* Generate password button */}
          <button
            onClick={handleGenerate}
            title="Generate strong password"
            className="p-2.5 text-slate-400 hover:text-primary
              transition-colors duration-200 rounded-lg
              hover:bg-primary-glow btn-press"
          >
            <FiRefreshCw size={22} />
          </button>

          {/* Show/hide password button */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
            className="p-2.5 text-slate-400 hover:text-primary
              transition-colors duration-200 rounded-lg
              hover:bg-primary-glow btn-press"
          >
            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>
      </div>

      {/* Strength meter appears as user types */}
      {password && <StrengthMeter analysis={analysis} />}
    </div>
  );
};

export default PasswordInput;
