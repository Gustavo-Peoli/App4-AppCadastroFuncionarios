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
          DEFAULT: '#F7F9FD', // Fundo claro padrão do projeto
          dark: '#181818', // Fundo escuro (caso precise)
          light: '#232323',
        },
        surface: {
          DEFAULT: '#242424', // Superfície de cards, etc
        },
        text: {
          DEFAULT: '#222222', // Texto escuro para fundo claro
          muted: '#B3B3B3',
          onPrimary: '#F5F5F5',
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
