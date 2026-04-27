import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

function fileListPlugin(version: string): Plugin {
    const virtualModuleId = 'virtual:file-list';
    const resolvedId = `\0${virtualModuleId}`;

    return {
        name: 'file-list',
        resolveId(id) {
            if (id === virtualModuleId) return resolvedId;
        },
        load(id) {
            if (id !== resolvedId) return;

            const dataRoot = path.resolve(__dirname, '../../public/data', 'Loot');
            const spawnerDir = path.join(dataRoot, 'Spawners/Presets/Default');
            const nodeDir = path.join(dataRoot, 'Nodes/Default');

            const readJsonFiles = (dir: string) =>
                fs.existsSync(dir)
                    ? fs
                          .readdirSync(dir)
                          .filter((f) => f.endsWith('.json'))
                          .sort()
                    : [];

            const spawners = readJsonFiles(spawnerDir);
            const nodes = readJsonFiles(nodeDir);

            return `export const spawnerFiles = ${JSON.stringify(spawners)};\nexport const nodeFiles = ${JSON.stringify(nodes)};`;
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { VITE_CURRENT_SCUM_VERSION } = loadEnv(mode, path.resolve(__dirname, '../../'));

    return {
        base: '/',
        root: 'src/',
        envDir: '../../../',
        publicDir: false,
        build: {
            outDir: '../dist',
            emptyOutDir: true,
        },
        plugins: [
            fileListPlugin(VITE_CURRENT_SCUM_VERSION),
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
            viteStaticCopy({
                targets: [
                    {
                        src: `../../../public/data/Loot/Spawners/Presets/Default/*.json`,
                        dest: `data/Loot/Spawners/Presets/Default/`,
                    },
                    {
                        src: `../../../public/data/Loot/Nodes/Default/*.json`,
                        dest: `data/Loot/Nodes/Default/`,
                    },
                    {
                        src: `../../../public/data/Loot/Items/Default/*.json`,
                        dest: `data/Loot/Items/Default/`,
                    },
                    {
                        src: `../../../public/data/Loot/CooldownGroups/Default/*.json`,
                        dest: `data/Loot/CooldownGroups/Default/`,
                    },
                    { src: `../../../public/CNAME`, dest: `.` },
                ],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/'),
            },
        },
    };
});
