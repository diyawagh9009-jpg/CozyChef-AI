module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFF8F2',
        card: '#FFFFFF',
        primary: '#F6B26B',
        secondary: '#FFD6E8',
        accent: '#BEE3DB',
        highlight: '#FFF3B0',
        text: '#5B4B49',
        border: '#F2D7C4'
      },
      boxShadow: {
        cozy: '0 20px 60px rgba(91, 75, 73, 0.08)',
        soft: '0 10px 30px rgba(246, 178, 107, 0.14)'
      },
      fontFamily: {
        fredoka: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        nunito: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
        baloo: ['Baloo 2', 'ui-rounded', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
