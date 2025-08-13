/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Add any dynamic class names here to make sure Tailwind keeps them
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "text-white",
    "text-black",
    "hidden",
    "block",
    "flex",
    "grid",
    "md:flex",
    "lg:grid",
    // Add more if you have dynamic classes in your Vue components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
