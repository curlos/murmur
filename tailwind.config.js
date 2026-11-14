const colors = require('tailwindcss/colors');

module.exports = {
  mode: "",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      bluegray: colors.blueGray,
      coolgray: colors.coolGray,
      // Warm grays tinted toward the brand accent (replaces Tailwind's default blue-ish gray).
      gray: {
        50: '#FBF9F8',
        100: '#F6F1EF',
        200: '#EAE2DE',
        300: '#D9CDC7',
        400: '#AA9C95',
        500: '#81736C',
        600: '#5C4F49',
        700: '#4A3B35',
        800: '#2E2420',
        900: '#1F1814',
      },
      truegray: colors.trueGray,
      warmgray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      // Brand accent (Murmur "Persimmon"). Key kept as "lightblue" so existing classes keep working.
      lightblue: {
        50: '#FFF3EE',
        100: '#FFE3D8',
        200: '#FFC5B0',
        300: '#FFA07F',
        400: '#FF7A52',
        500: '#D43F18',
        600: '#D43F18',
        700: '#B03213',
        800: '#8C2912',
        900: '#712413',
      },
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,

    },
    extend: {
      gridTemplateColumns: {
        'smallEvent': '2fr 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
