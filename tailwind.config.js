import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    colors: {
      current: "currentColor",
      primary: {
        DEFAULT: "#000000DE",
        main: "#042F40",
        dark: "#12495E",
        light: "#387085",
        contrast: "#F5F7F2",
      },
      secondary: {
        main: "#CE6533",
        dark: "#69341A",
        light: "#924724",
        contrast: "#FFFFFF",
      },
      error: {
        main: "#D32F2F",
        dark: "#C62828",
        light: "#EF5350",
        contrast: "#FFFFFF",
      },
      warning: {
        main: "#EF6C00",
        dark: "#E65100",
        light: "#FF9800",
        contrast: "#FFFFFF",
      },
      info: {
        main: "#0288D1",
        dark: "#01579B",
        light: "#03A9F4",
        contrast: "#FFFFFF",
      },
      success: {
        main: "#2E7D32",
        dark: "#1B5E20",
        light: "#4CAF50",
        contrast: "#FFFFFF",
      },
    },
    fontFamily: {
      sans: ["Px Grotesk", ...defaultTheme.fontFamily.sans],
      mono: ["Px Grotesk Mono", ...defaultTheme.fontFamily.mono],
    },
    fontWeight: {
      screen: "200",
      thin: "250",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    letterSpacing: {
      normal: "0",
      0.1: "0.1px",
      0.15: "0.15px",
      0.25: "0.25px",
      0.4: "0.4px",
      0.5: "0.5px",
      1: "1px",
    },
    extend: {
      opacity: {
        8: ".08",
        12: ".12",
        24: ".24",
        44: ".44",
      },
      keyframes: {
        "modal-in": {
          "0%": {
            transform: "scale(.96)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        "modal-out": {
          "0%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(.96)",
            opacity: 0,
          },
        },
        "mobile-modal-in": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "mobile-modal-out": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
        "backdrop-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "backdrop-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "modal-in": "modal-in 0.5s ease-in-out forwards",
        "modal-out": "modal-out 0.5s ease-in-out forwards",
        "mobile-modal-in": "mobile-modal-in 0.5s ease-in-out forwards",
        "mobile-modal-out": "mobile-modal-out 0.5s ease-in-out forwards",
        "backdrop-in": "backdrop-in 0.5s ease-in-out forwards",
        "backdrop-out": "backdrop-out 0.5s ease-in-out forwards",
      },
    },
  },
  prefix: "b-",
  plugins: [],
};
