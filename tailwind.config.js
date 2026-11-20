/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bento: {
          page: '#EDEDED',
          container: '#F6F6F6',
          card: '#FFFFFF',
          lime: '#B6F36B',
          limeGrad: '#9BE04F',
          darkGreen: '#12391E',
          darkGreenHover: '#1B522C',
          text: '#111111',
          muted: '#555555',
          border: '#E3E3E3',
          riskLow: '#1E7B34',
          riskMedium: '#B26A00',
          riskHigh: '#C62828',
          emergencyBg: '#FDE3E3',
          emergencyText: '#C62828',
        }
      },
      borderRadius: {
        'bento-container': '28px',
        'bento-card': '24px',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'senior-base': '1.125rem', // 18px minimum body font
        'card-title': '1.375rem',  // 22px semi-bold
        'heading-big': '2.25rem',  // 36px bold
      },
      minHeight: {
        'touch': '48px',
        'button-pill': '52px',
      },
      minWidth: {
        'touch': '48px',
      },
      boxShadow: {
        'bento': '0 4px 20px rgba(0, 0, 0, 0.03)',
        'bento-hover': '0 8px 30px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
