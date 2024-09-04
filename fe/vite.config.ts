import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Awesome App',
        short_name: 'AwesomeApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
