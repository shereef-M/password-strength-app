import zxcvbn from "zxcvbn";

export const analysePassword = (password) => {
  if (!password) {
    return {
      score: 0,
      label: "",
      crackTime: "",
      feedback: { warning: "", suggestions: [] },
      color: "gray",
    };
  }

  const result = zxcvbn(password);

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["red", "orange", "yellow", "blue", "green"];
  const tailwindColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  const textColors = [
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-blue-400",
    "text-green-400",
  ];

  return {
    score: result.score,
    label: labels[result.score],
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
    feedback: {
      warning: result.feedback.warning || "",
      suggestions: result.feedback.suggestions || [],
    },
    color: colors[result.score],
    barColor: tailwindColors[result.score],
    textColor: textColors[result.score],
    percentage: ((result.score + 1) / 5) * 100,
  };
};

export const generatePassword = (length = 16) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = uppercase + lowercase + numbers + symbols;

  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
