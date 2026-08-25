//plugin allow vite to process jsx files/React components
//defineConfig:Helps organize the Vite configuration.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (request) => {
            request.setHeader('origin', 'http://localhost:3000');
          });
        },
      },
    },
  },
});
//tailwindcss(): Enables Tailwind CSS styling in the project.
//react(): Allows Vite to work with React and JSX files.