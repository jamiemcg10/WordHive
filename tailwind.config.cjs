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
    extend: {
      backdropBlur: {
        xs: '2px'
      },
      spacing: {
        ...getPercentages(),
        '120': '30rem',
        '136': '34rem'
      }
    }
  },
  plugins: []
}
