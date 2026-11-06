import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        ink: '#1B1F2A',
        pearl: '#F2F4F6',
        brass: '#B08D57',
        garnet: '#7A1F3D',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
} satisfies Config
