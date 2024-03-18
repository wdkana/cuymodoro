/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx, js}", "./src/**/*.{html,tsx, ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
