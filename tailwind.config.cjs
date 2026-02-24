module.exports = {
  content: ['./index.html', './admin.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#78350F',
        secondary: '#92400E',
        accent: '#FBBF24',
        background: '#FFFBF0',
        text: '#2D1B14',
        surface: '#FDF5E6',
        gold: '#A67C52'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif']
      },
      boxShadow: {
        vintage: '0 4px 20px -2px rgba(75, 44, 32, 0.15)',
        badge: '0 2px 10px rgba(194, 24, 91, 0.2)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards'
      }
    }
  },
  plugins: [],
};
