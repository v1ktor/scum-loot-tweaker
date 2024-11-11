import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
      viteStaticCopy({
        targets: [
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/spawners/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/spawners/` },
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/nodes/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/nodes/` },
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/parameters/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/parameters/` },
          { src: `../../public/data/${VITE_CURRENT_SCUM_VERSION}/cooldown-groups/*.json`, dest: `data/${VITE_CURRENT_SCUM_VERSION}/cooldown-groups/` },
        ]
      })
    ],
  }
});
