import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        jet: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        vm: {
          paper: '#F6F5F0',
          card: '#FFFFFF',
          sunk: '#EEEDE6',
          line: '#E1DFD5',
          line2: '#CFCCBF',
          ink: '#0E1F1A',
          muted: '#5B6862',
          green: '#0F3D31',
          deep: '#082A21',
          mint: '#7FE0B5',
          brass: '#B08A3E',
          brasslt: '#E7C77E',
          allow: '#118457',
          deny: '#C4402E',
        },
      },
      letterSpacing: { tightest: '-0.045em' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        rise: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
        pulseDot: { '50%': { opacity: 0.35 } },
        flowx: { from: { strokeDashoffset: 24 }, to: { strokeDashoffset: 0 } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        flowx: 'flowx 1s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
