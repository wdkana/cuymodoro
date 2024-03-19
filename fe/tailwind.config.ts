import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
