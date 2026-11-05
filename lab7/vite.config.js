import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — відносні шляхи у зібраному сайті, щоб він працював
// з будь-якої папки, зокрема на GitHub Pages за адресою /fe-basics-labs/lab7/dist/
export default defineConfig({
  plugins: [react()],
  base: './'
});
