/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // <-- 여기가 핵심! src 폴더 전체 스캔
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

