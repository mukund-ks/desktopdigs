/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./client/index.html",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Cabin', 'sans-serif'],
    },
    extend: {
      colors:{
        transparent:'transparent',
        current:'currentColor',
        mywhite:'#FAF9F6',
        myBlack:'#1A1A1D',
        myGray:'#4E4E50',
        myRed1:'#6F2232',
        myRed2:'#950740',
        myRed3:'#C3073F',
      },
    },
  },
  plugins: [],
})

