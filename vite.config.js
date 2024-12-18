import { defineConfig } from 'vite';

export default defineConfig({
  base: '/MLG/', // Matches the deployed path
  build: {
    outDir: 'docs',
  },
  server: {
    host: true,
    port: 5173,

  },
});
