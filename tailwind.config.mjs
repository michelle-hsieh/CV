/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Wix 商業履歷模板風格：Libre Baskerville 標題 + Lato 內文
        serif: ['"Libre Baskerville"', '"Noto Serif TC"', 'Georgia', 'serif'],
        sans: ['"Lato"', '"Noto Sans TC"', '-apple-system', 'sans-serif'],
        display: ['"Libre Baskerville"', '"Noto Serif TC"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
      },
      colors: {
        ink: '#1a1a1a',
        muted: '#6b6b6b',
        paper: '#ffffff',
      },
    },
  },
  plugins: [],
};
