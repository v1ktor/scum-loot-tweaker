import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/test/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/pages/quests/**', 'src/utils/**', 'src/lib/**'],
            exclude: ['src/test/**'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
});
