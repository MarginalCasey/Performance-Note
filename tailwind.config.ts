import withMT from "@material-tailwind/react/utils/withMT";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Apple Color Emoji",
        "Arial",
        "sans-serif",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
    },
  },
  plugins: [],
};

export default withMT(config);
