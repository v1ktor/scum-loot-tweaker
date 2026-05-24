import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        base: '/',
        root: 'src/',
        envDir: '../',
        publicDir: false,
        build: {
            outDir: '../dist',
            emptyOutDir: true,
        },
        plugins: [
            react(),
            tailwindcss(),
            {
                name: 'inject-analytics',
                transformIndexHtml(html, ctx) {
                    if (ctx.server) return html;
                    return html.replace(
                        '</head>',
                        '    <script src="https://app.rybbit.io/api/script.js" data-site-id="23d3baf29b9e" defer></script>\n</head>',
                    );
                },
            },
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/'),
            },
        },
    };
});
