import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist', // Asegúrate de que Vercel use la carpeta dist
    rollupOptions: {
      output: {
        manualChunks: {
          // Opcional: Para dividir bibliotecas más grandes en chunks separados
        }
      }
    }
  }
})
