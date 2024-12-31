/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}","./app.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        app_green_color:"#285F43",
      }
    },
  },
  plugins: [],
}

