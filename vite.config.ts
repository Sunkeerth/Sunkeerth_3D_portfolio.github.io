import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Sunkeerth_3D_portfolio.github.io/', // 👈 add this line
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {    
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  }
})
