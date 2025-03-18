import type { Config } from "tailwindcss";

export default {

  content: [

    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

  ],

  theme: {

    extend: {

      colors: {

        primary: "#9C5CE1",
        secondary: "#C77E01",
        light: "#222222",
        dark: "#777777",

      },

    },

  },

  plugins: [],

} satisfies Config;