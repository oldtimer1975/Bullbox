import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: { base: 'var(--bg-base)', elev: 'var(--bg-elev)' },
        fg: { primary: 'var(--fg-primary)', muted: 'var(--fg-muted)' },
        brand: { primary: 'var(--brand-primary)', accent: 'var(--brand-accent)' },
        state: { success: 'var(--state-success)', warn: 'var(--state-warn)', error: 'var(--state-error)', info: 'var(--state-info)' },
        border: { subtle: 'var(--border-subtle)', strong: 'var(--border-strong)' },
        badge: { insurance: 'var(--badge-insurance)', door2door: 'var(--badge-door2door)', stairs: 'var(--badge-stairs)' }
      },
      borderRadius: {
        sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)'
      },
      boxShadow: {
        sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)'
      }
    }
  },
  plugins: []
} satisfies Config
