/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8800', // Laranja principal
          dark: '#CC6E00',
          light: '#FFA94D',
        },
        secondary: {
          DEFAULT: '#222222', // Preto secundário
          dark: '#111111',
          light: '#333333',
        },
        background: {
          DEFAULT: '#181818', // Fundo escuro
          light: '#232323',
        },
        surface: {
          DEFAULT: '#242424', // Superfície de cards, etc
        },
        text: {
          DEFAULT: '#F5F5F5', // Texto claro
          muted: '#B3B3B3',
          onPrimary: '#181818',
        },
        accent: {
          DEFAULT: '#FFB300', // Laranja de destaque
        },
        border: {
          DEFAULT: '#333333',
        },
      },
    },
  },
  plugins: [],
}
