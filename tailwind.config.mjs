/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 15s linear infinite", // Adjusted to match original 15s
        "marquee-mobile": "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" }, // Adjusted to match original
          "100%": { transform: "translateX(-50%)" }, // Adjusted to match original
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#f02d34", // Added for consistency
        secondary: "#324d67", // Added for consistency
      },
      spacing: {
        4.5: "1.125rem", // 18px assuming 1rem = 16px
        1.5: "0.375rem", // 6px
        15: "3.75rem", // 60px
        30: "7.5rem", // 120px
        0.5: "0.125rem", // 2px
      },
    },
  },
  plugins: [],
};
