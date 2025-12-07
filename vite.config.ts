import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_CURRENT_SCUM_VERSION } = loadEnv(mode, process.cwd());

  return {
    base: '/',
    root: 'src/ui/',
    envDir: '../../',
    build: {
      outDir: '../../dist',
      emptyOutDir: true,
    },
    plugins: [
      react(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/Spawners/Presets/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/Spawners/Presets/Default/` },
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/Nodes/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/Nodes/Default/` },
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/Items/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/Items/Default/` },
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/CooldownGroups/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/CooldownGroups/Default/` },
          { src: `../../public/CNAME`, dest: `.` },
        ]
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/ui/"),
      },
    },
  }
});
