import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    host: '192.168.1.34'
  },
  build: {
    target: 'esnext',
  },
});
