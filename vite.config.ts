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
        { src: 'src/data/spawners/*.json', dest: 'data/spawners/' },
        { src: 'src/data/nodes/*.json', dest: 'data/nodes/' },
        { src: 'src/data/parameters/*.json', dest: 'data/parameters/' },
      ]
    })
  ],
})
