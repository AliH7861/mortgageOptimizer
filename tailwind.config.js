/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add other paths if you use components elsewhere
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%':   { transform: 'scale(1)',   opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0.3' },
        },
        'shift-dash': {
          '0%':   { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '24' },
        },
      },
      animation: {
        pulse:      'pulse 4s ease-in-out infinite alternate',
        'shift-dash': 'shift-dash 4s linear infinite',
      },
    },
  },
  plugins: [],
};
