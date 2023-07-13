/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./client/index.html",
  ],
  theme: {
    fontFamily: {
      sans: ['Cabin', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
})

