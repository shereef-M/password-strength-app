import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import BreachChecker from "../components/BreachChecker";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiShield, FiLock, FiZap } from "react-icons/fi";

const HomePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero section */}
      <div
        className="bg-gradient-to-b from-slate-800 to-slate-900
        px-6 py-16 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600/20 p-5 rounded-full">
              <FiShield className="text-indigo-400" size={52} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Is Your Password Safe?
          </h1>
          <p className="text-slate-400 text-xl sm:text-2xl leading-relaxed">
            Check your password strength and find out if it has been exposed in
            a data breach — privately and securely.
          </p>
        </div>
      </div>

      {/* Main card */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 sm:p-10">
          <PasswordInput onPasswordChange={setCurrentPassword} />
          <BreachChecker password={currentPassword} />
          {!user && currentPassword && (
            <p className="text-center text-base text-slate-500 mt-5">
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 text-lg"
              >
                Create an account
              </Link>{" "}
              to save your check history
            </p>
          )}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {[
            {
              icon: <FiZap className="text-indigo-400" size={28} />,
              title: "Real-time Analysis",
              desc: "Instant feedback as you type",
            },
            {
              icon: <FiShield className="text-green-400" size={28} />,
              title: "Privacy First",
              desc: "Your password never leaves your device",
            },
            {
              icon: <FiLock className="text-blue-400" size={28} />,
              title: "Breach Detection",
              desc: "Checks against 800M+ leaked passwords",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-slate-800/50 border border-slate-700
              rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-3">{feature.icon}</div>
              <h3 className="text-white text-lg font-semibold mb-1">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
