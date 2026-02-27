module.exports = {
  content: ['./index.html', './admin.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#6B4A3A',
        secondary: '#8A6551',
        accent: '#A0785C',
        background: '#F6EFE6',
        text: '#3F2A21',
        surface: '#FFF8F1',
        gold: '#A67C52',
        muted: '#8C776B',
        softborder: '#DCCBBC',
        hover: '#5A3D31',
        lightaccent: '#EFE2D6'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif']
      },
      boxShadow: {
        vintage: '0 4px 20px -2px rgba(107, 74, 58, 0.15)',
        badge: '0 2px 10px rgba(160, 120, 92, 0.2)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards'
      }
    }
  },
  plugins: [],
};
