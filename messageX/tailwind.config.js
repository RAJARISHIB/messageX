module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Angular templates + inline templates in TS
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
