// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//      tailwindcss(),
//   ],
//   base: '/',
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',       // <--- important for Netlify to serve JS correctly
  build: {
    outDir: 'dist' // output folder matches Netlify publish folder
  }
});
