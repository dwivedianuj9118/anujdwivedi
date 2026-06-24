/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // 👈 Ensure this is set to 'class' or 'selector'
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
