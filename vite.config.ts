import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Ensuring the build is optimized for Vercel
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Splitting large vendor libraries to improve initial load time
          yjs: ['yjs', 'y-webrtc', 'y-indexeddb'],
          react: ['react', 'react-dom']
        }
      }
    }
  }
});