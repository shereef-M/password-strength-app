/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        "primary-dark": "#059669",
        "primary-light": "#34d399",
        "primary-glow": "rgba(16, 185, 129, 0.15)",
        surface: "#0a0f0a",
        "surface-2": "#111a11",
        "surface-3": "#162016",
        "surface-card": "#1a2a1a",
        "surface-input": "#162016",
        border: "#1e3a1e",
        "border-hover": "#2d5a2d",
        "border-focus": "#10b981",
      },
      boxShadow: {
        glow: "0 0 20px rgba(16, 185, 129, 0.25)",
        "glow-sm": "0 0 10px rgba(16, 185, 129, 0.15)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, #111a11, #0a0f0a)",
      },
    },
  },
  plugins: [],
};
