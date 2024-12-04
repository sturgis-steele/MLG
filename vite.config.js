import { defineConfig } from 'vite';

export default defineConfig({
  base: '/MLG/', // Replace 'MLG' with the name of your GitHub repo
  build: {
    outDir: 'docs', // Ensure the build output is placed in the 'docs' folder for GitHub Pages
  },
});
