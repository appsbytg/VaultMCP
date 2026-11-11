import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'geist-mono': ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        zk: {
          bg: '#05070D',
          panel: '#0A0E1A',
          raised: '#0F1424',
          line: '#1A2136',
          line2: '#252E4A',
          fg: '#EDF0F7',
          muted: '#8A93AD',
          dim: '#5A6383',
          cobalt: '#4D6BFF',
          sky: '#8FA4FF',
          amber: '#FFB224',
          ok: '#3CD68C',
          bad: '#FF6B5E',
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
