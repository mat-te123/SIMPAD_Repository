/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Define the Animation Name and Duration
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite",
      },
      // 2. Define the Movement (Keyframes)
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
