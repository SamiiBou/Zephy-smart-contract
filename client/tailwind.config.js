/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./src/pages/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "niche-purple": {
          500: "var(--clr-purple-500)",
          400: "var(--clr-purple-400)",
          300: "var(--clr-purple-300)",
        }
      }
    },
  },
  plugins: [],
}

