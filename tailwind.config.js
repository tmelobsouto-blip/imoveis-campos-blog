/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        border: 'var(--color-border)',
        bg: 'var(--color-bg)',
        'bg-secondary': 'var(--color-bg-secondary)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
      },
      fontSize: {
        display: 'var(--text-display)',
        h1: 'var(--text-h1)',
        h2: 'var(--text-h2)',
        h3: 'var(--text-h3)',
        body: 'var(--text-body)',
        sm: 'var(--text-sm)',
      },
      lineHeight: {
        display: 'var(--lh-display)',
        heading: 'var(--lh-heading)',
        body: 'var(--lh-body)',
      },
      maxWidth: {
        post: '800px',
        content: '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
