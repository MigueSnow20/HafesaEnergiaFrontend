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
    chunkSizeWarningLimit: 600, // Opcional: Aumenta el límite si sigue la advertencia
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Mueve dependencias grandes a un chunk separado
          }
        }
      }
    }
  }
})
