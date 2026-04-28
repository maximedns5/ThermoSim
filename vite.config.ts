import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/ThermoSim/',
  test: {
    environment: 'node',
    globals: true,
    include: ['src/tests/**/*.test.ts'],
    server: {
      deps: {
        // Avoid transforming heavy 3D/React deps during engine-only tests
        external: ['three', '@react-three/fiber', '@react-three/drei', 'react', 'react-dom'],
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  worker: {
    format: 'es',
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: [
      'use-sync-external-store/shim/with-selector',
      'use-sync-external-store/shim',
      'zustand',
      'zustand/middleware/immer',
    ],
  },
});
