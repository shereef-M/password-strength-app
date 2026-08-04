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
    <div className="min-h-screen bg-surface page-fade">
      {/* Hero section */}
      <div className="bg-hero-gradient px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div
              className="bg-primary-glow border border-border
              p-5 rounded-full shadow-glow"
            >
              <FiShield className="text-primary" size={56} />
            </div>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-5
            leading-tight"
          >
            Is Your Password <span className="text-primary">Safe?</span>
          </h1>
          <p
            className="text-slate-400 text-xl sm:text-2xl leading-relaxed
            max-w-2xl mx-auto"
          >
            Check your password strength and find out if it has been exposed in
            a data breach — privately and securely.
          </p>
        </div>
      </div>

      {/* Main card */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div
          className="bg-surface-card rounded-2xl border border-border
          p-8 sm:p-10 shadow-card"
        >
          <PasswordInput onPasswordChange={setCurrentPassword} />
          <BreachChecker password={currentPassword} />
          {!user && currentPassword && (
            <p className="text-center text-base text-slate-500 mt-6">
              <Link
                to="/register"
                className="text-primary hover:text-primary-light
                  text-lg font-medium transition-colors"
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
              icon: <FiZap className="text-primary" size={30} />,
              title: "Real-time Analysis",
              desc: "Instant feedback as you type",
            },
            {
              icon: <FiShield className="text-primary" size={30} />,
              title: "Privacy First",
              desc: "Your password never leaves your device",
            },
            {
              icon: <FiLock className="text-primary" size={30} />,
              title: "Breach Detection",
              desc: "Checks against 800M+ leaked passwords",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-surface-2 border border-border rounded-xl
                p-6 text-center hover:border-border-hover transition-all
                duration-300 hover:shadow-glow-sm"
            >
              <div className="flex justify-center mb-3">{feature.icon}</div>
              <h3 className="text-white text-lg font-semibold mb-2">
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
