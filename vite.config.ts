import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
// @ts-ignore
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',       // Compression Brotli
      ext: '.br',                        // Extension ajoutée
      deleteOriginFile: false            // Garde les fichiers originaux
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,              // Supprime tous les console.log
        drop_debugger: true              // Supprime les debugger
      }
    },
    rollupOptions: {
      plugins: [terser()]
    }
  }
})
