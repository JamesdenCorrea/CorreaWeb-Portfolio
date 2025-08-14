/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // everything in src
  ],
  safelist: [
    // Auto-include dynamically generated classes
    {
      pattern: /bg-(red|green|blue|yellow|purple|pink|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(red|green|blue|yellow|purple|pink|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /p-(0|1|2|3|4|5|6|8|10|12|16|20)/,
    },
    {
      pattern: /m-(0|1|2|3|4|5|6|8|10|12|16|20)/,
    },
    // Add more patterns as needed for border, rounded, etc.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
