/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",        // all Vue/JS/TS files under src
    "./src/components/**/*.{vue,js,ts,jsx,tsx}" // explicitly include components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
