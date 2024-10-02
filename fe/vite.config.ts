import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Vitest 설정을 위한 타입 임포트
import type { UserConfig as VitestUserConfig } from 'vitest/config';

// Vite 설정과 Vitest 설정을 결합한 인터페이스
interface UserConfig extends VitestUserConfig {
  test?: {
    globals?: boolean;
    environment?: string;
    setupFiles?: string | string[];
    include?: string[];
    exclude?: string[];
  };
}

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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
} as UserConfig);
