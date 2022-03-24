module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sourceCodePro: " 'Source Code Pro', 'monospace' ",
      },
      backgroundColor: {
        light: "#FDFDFD",
        dark: "#251A16",
      },
      colors: {
        light: "#FDFDFD",
        dark: "#251A16",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
