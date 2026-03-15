/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              "primary": "#0df233",
              "secondary": "#ff6b00",
              "accent": "#bf00ff",
              "background-light": "#f5f8f6",
              "background-dark": "#0a120b",
          },
          fontFamily: {
              "display": ["Space Grotesk", "sans-serif"]
          },
          borderRadius: {
              "DEFAULT": "0.5rem",
              "lg": "1rem",
              "xl": "1.5rem",
              "2xl": "2.5rem",
              "full": "9999px"
          },
      },
  },
  plugins: [],
}
