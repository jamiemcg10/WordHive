/** @type {import('tailwindcss').Config} */

const getPercentages = () => {
  const range = [...Array(100).keys()]
  const pctMap = range.reduce((p,c) => {
    return {
      ...p,
      [`${c}%`]: `${c}%`
    }
  }, {})
  return pctMap
}

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: 'Helvetica, Arial, sans-serif'
    },
    screens: {
      desktop: '640px',
      tablet: { 'max': '639px'},
      mobile: { 'max': '399px'},
    },
    extend: {
      backdropBlur: {
        xs: '2px'
      },
      spacing: {
        ...getPercentages(),
        '104': '26rem',
        '120': '30rem',
        '136': '34rem'
      }
    }
  },
  plugins: []
}
