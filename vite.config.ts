import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/scum-loot-tweaker/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: `src/ui/data/0954280211/spawners/*.json`, dest: `data/0954280211/spawners/` },
        { src: `src/ui/data/0954280211/nodes/*.json`, dest: `data/0954280211/nodes/` },
        { src: `src/ui/data/0954280211/parameters/*.json`, dest: `data/0954280211/parameters/` },
      ]
    })
  ],
})
