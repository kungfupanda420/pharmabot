import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'f962-117-250-237-122.ngrok-free.app', // Allow this ngrok host
    ],
    watch: {
      ignored: ['**/node_modules/**', '**/myenv/**'],
    },
    port: 3000, // Optional: Specify a port
    host: '0.0.0.0', // Optional: Make the server accessible on your network
    open: true, // Optional: Automatically open the browser
  },
});