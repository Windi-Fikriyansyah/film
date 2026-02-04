import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                surface: '#141414',
                accent: '#E50914',
                'accent-hover': '#F6121D',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            aspectRatio: {
                'poster': '2 / 3',
            },
        },
    },
    plugins: [],
}
export default config
