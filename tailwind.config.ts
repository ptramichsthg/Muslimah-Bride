import { type Config } from "tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F1F5F9",
                card: "#FFFFFF",
                foreground: "#1C2434",
                muted: "#64748B",
                accent: "#D4A843",
                dark: "#1C2434",
                border: "#E2E8F0",
            },
            fontFamily: {
                sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
                heading: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
                body: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;
