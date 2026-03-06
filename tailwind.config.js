
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#16302B",
                accent: "#694873",
                secondary: "#8B728E",
                highlight: "#85B79D",
                surface: "#C0E5C8",
            },
            fontFamily: {
                mono: ['"Cascadia Mono"', 'Consolas', 'monospace'],
            },
            boxShadow: {
                card: '0 2px 8px rgba(22,48,43,0.08)',
                'card-hover': '0 4px 16px rgba(22,48,43,0.15)',
                modal: '0 8px 32px rgba(22,48,43,0.25)',
            },
            borderRadius: {
                xl: '1rem',
                '2xl': '1.25rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
                'slide-up': 'slideUp 0.25s ease-out',
                'scale-in': 'scaleIn 0.15s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
