/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}","./dist/**/*.{js}"],
  theme: {
    extend: {},
  },
  plugins: {
    "@tailwindcss/postcss": {},
  }
}