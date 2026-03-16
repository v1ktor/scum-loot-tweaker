import {defineConfig, loadEnv, Plugin} from 'vite'
import react from '@vitejs/plugin-react'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

function fileListPlugin(version: string): Plugin {
  const virtualModuleId = 'virtual:file-list';
  const resolvedId = '\0' + virtualModuleId;

  return {
    name: 'file-list',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;

      const dataRoot = path.resolve(__dirname, '../../public/data', version, 'Loot');
      const spawnerDir = path.join(dataRoot, 'Spawners/Presets/Default');
      const nodeDir = path.join(dataRoot, 'Nodes/Default');

      const readJsonFiles = (dir: string) =>
        fs.existsSync(dir)
          ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()
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
      viteStaticCopy({
        targets: [
          { src: `../../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/Spawners/Presets/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/Spawners/Presets/Default/` },
          { src: `../../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/Nodes/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/Nodes/Default/` },
          { src: `../../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/Items/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/Items/Default/` },
          { src: `../../../public/data/${VITE_CURRENT_SCUM_VERSION}/Loot/CooldownGroups/Default/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/Loot/CooldownGroups/Default/` },
          { src: `../../../public/CNAME`, dest: `.` },
        ]
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  }
});

