import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            include: ['**/*.svg'],
        }),
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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://buddyguard.site:8080',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); },
            },
        },
        sever: {
            port: 5173,
        },
    },
});
