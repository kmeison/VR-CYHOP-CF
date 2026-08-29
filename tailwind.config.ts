import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#070E1B",
        sun: "#62D1FF",
        cloud: "#F3F5F8",
        ivy: "#12ACEC",
        midnight: "#070E1B",
        cyan: "#62D1FF",
      },
    },
  },
  plugins: [],
};

export default config;
