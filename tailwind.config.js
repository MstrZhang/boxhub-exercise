/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#272822",
        bg_h: "#3e3d32",
        bg_c: "#75715e",
        t_white: "#f8f8f2",
        t_yellow: "#e6db74",
        t_orange: "#fd971f",
        t_red: "#f92672",
        t_magenta: "#fd5ff0",
        t_violet: "#ae81ff",
        t_blue: "#66d9ef",
        t_cyan: "#a1efe4",
        t_green: "#a6e22e",
      },
    },
  },
  plugins: [],
};
