import type { Config } from 'tailwindcss';

/**
 * Breakpoints are explicit rather than Tailwind's defaults: the design is
 * checked at 320 / 375 / 390 / 414 / 430 / 480 / 600 / 768 / 900 / 1024 /
 * 1280 / 1440 / 1600 / 1920, so the scale has a stop near each of those.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '480px',
      ms: '600px',
      md: '768px',
      tb: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px',
    },
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        bone: 'rgb(var(--bone) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: 'var(--shell)',
        measure: '68ch',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
