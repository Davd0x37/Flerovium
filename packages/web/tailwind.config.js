const colors = {
  primary: {
    DEFAULT: '#F8F7F1',
    light: '#F8F7F1',
    dark: '#F8F7F1',
  },
  secondary: {
    DEFAULT: '#4E6E7A',
    light: '#4E6E7A',
    dark: '#282D31',
  },
  accent: {
    DEFAULT: '#D4DFC8',
    light: '#D4DFC8',
    dark: '#84A294',
  },
  brand: '#6FAF49',
  info: '#2f4a55',
  success: '#57af4e',
  warning: '#d49f16',
  danger: '#f44336',
  default: '#999999',
};

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        header:
          '100px minmax(200px, 1fr) minmax(300px, 1fr) minmax(200px, 1fr)',
      },
    },
    fontFamily: {
      display: ['Roboto', 'sans-serif'],
    },

    backgroundColor: theme => ({
      ...theme('colors'),
      ...colors,
    }),

    textColor: theme => ({
      ...theme('colors'),
      ...colors,
    }),

    borderColor: theme => ({
      ...theme('colors'),
      ...colors,
    }),

    placeholderColor: theme => ({
      ...theme('colors'),
      ...colors,
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
