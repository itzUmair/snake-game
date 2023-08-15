/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "clr-100": "#FDFFFC",
        "clr-600": "#4CB944",
        "clr-900": "#2A2D34",
        "clr-950": "#1a1d21",
      },
    },
  },
  plugins: [],
};
