import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitest from 'vitest';

// https://vitejs.dev/config/
// <reference types="vitest" />
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
