/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // ✅ ensure all Vue and JS files are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
