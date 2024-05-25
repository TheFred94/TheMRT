/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],

  theme: {
    fontFamily: {
      header1: ['Geist-Black'],
      header2: ['Geist-Bold'],
      header2Alt: ['JetBrainsMono-ExtraBoldItalic'],
      header3: ['Geist-Bold'],
      header4: ['Geist-Medium'],
      paragraph: ['Geist-Regular'],
      paragraphAc: ['Geist-Medium'],
    },
    colors: {
      Bg: 'var(--Bg)',
      Tx: 'var(--Tx)',
      Sc: 'var(--Sc)',
      St: 'var(--St)',
      TxGray: 'var(--TxGray)',
      TxGray10: 'var(--TxGray10)',
      Ac: 'var(--Ac)',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
