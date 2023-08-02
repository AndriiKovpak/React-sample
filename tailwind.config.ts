import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4B0082",
        secondary: "#3F3F3F",
        "secondary-light": "#C0C0C0",
        "secondary-dark": "#1F1F1F",
        dark: "#000000",
        customPurple: "#CD8DFF",
        customBlue: "#7680FF",
        customPink: "#FF9CFB",
        lightBlue: "#3CA4FF",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus"],
      textColor: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus"],
    },
  },
  plugins: [forms, typography, containerQueries],
} satisfies Config;

export default config;
