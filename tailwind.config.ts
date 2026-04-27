import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper:        '#F4F2ED',
      'paper-alt':  '#EEEBE3',
      surface:      '#FFFFFF',
      ink:          '#0A0A0A',
      'ink-2':      '#2B2B2B',
      'ink-3':      '#6B6B6B',
      'ink-4':      '#A0A0A0',
      rule:         '#C8C5BE',
      'rule-soft':  '#E2DFD8',
      accent:       '#C1440E',
      white:        '#FFFFFF',
      black:        '#000000',
    },
    fontFamily: {
      mono:  ['"IBM Plex Mono"', 'monospace'],
      sans:  ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      serif: ['"IBM Plex Serif"', 'serif'],
    },
    fontSize: {
      '2xs': ['9px',  { lineHeight: '14px' }],
      xs:    ['10px', { lineHeight: '14px' }],
      sm:    ['11px', { lineHeight: '16px' }],
      base:  ['12px', { lineHeight: '18px' }],
      md:    ['13px', { lineHeight: '20px' }],
      lg:    ['16px', { lineHeight: '22px' }],
      xl:    ['22px', { lineHeight: '28px' }],
      '2xl': ['28px', { lineHeight: '32px' }],
      '3xl': ['36px', { lineHeight: '40px' }],
    },
    borderRadius: {
      DEFAULT: '0',
      sm: '2px',
      md: '4px',
    },
    extend: {
      spacing: { '0.5': '2px' },
    },
  },
  plugins: [],
} satisfies Config;
