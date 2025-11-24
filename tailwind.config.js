/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-dark': '#1E40AF',
        secondary: '#10B981',
        'secondary-dark': '#047857',
        neutral: '#6B7280',
        'neutral-light': '#F3F4F6',
        'neutral-border': '#E5E7EB',
      },
    },
  },
  plugins: [],
}
