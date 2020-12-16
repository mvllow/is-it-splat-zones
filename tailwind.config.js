const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        fg: "#f4f4f4",
        base: "#161515",
        surface: "#202022",
        subtle: "#959495",
        primary: "palevioletred",
      },
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
