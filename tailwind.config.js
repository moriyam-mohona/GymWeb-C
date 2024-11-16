/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1200px",
        xl: "1500px",
        "2xl": "1920px",
      },
      backgroundImage: {
        "hero-bg": "url('/src/assets/Images/Hero.png')",
        "footer-bg": "url('/src/assets/Images/Footer.png')",
        "login-bg": "url('/src/assets/Images/Login.png')",
      },
      backgroundSize: {
        small: "8%",
        quarter: "25%",
      },
    },
    fontFamily: {
      robo: '"Roboto", sans-serif',
      orbitron: '"Orbitron", sans-serif',
      out: '"Outfit", sans-serif',
      sans: ['"Outfit"', "sans-serif"],
    },
    colors: {
      yellow: "#D6FD51",
      orange: "#FF4601",
      red: "#ed2100",
      green: "#008000",
      blue: "#0A1425",
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  plugins: [require("daisyui")],
};
