// vite.config.js
import path from "path";
import react from "file:///Users/jinjaehwan/Documents/BUDDY/BuddyGuard/fe/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.5_@types+node@22.5.5_less@4.2.0_terser@5.32.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/jinjaehwan/Documents/BUDDY/BuddyGuard/fe/node_modules/.pnpm/vite@5.4.5_@types+node@22.5.5_less@4.2.0_terser@5.32.0/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///Users/jinjaehwan/Documents/BUDDY/BuddyGuard/fe/node_modules/.pnpm/vite-plugin-pwa@0.20.5_vite@5.4.5_@types+node@22.5.5_less@4.2.0_terser@5.32.0__workbox-build@_4h2mnrqp564mzh52xwuon7mlvm/node_modules/vite-plugin-pwa/dist/index.js";
import svgr from "file:///Users/jinjaehwan/Documents/BUDDY/BuddyGuard/fe/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@2.79.1_typescript@5.6.2_vite@5.4.5_@types+node@22.5.5_less@4.2.0_terser@5.32.0_/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/Users/jinjaehwan/Documents/BUDDY/BuddyGuard/fe";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr({
      include: ["**/*.svg"]
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Awesome App",
        short_name: "AwesomeApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: []
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@public": path.resolve(__vite_injected_original_dirname, "./public")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"]
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"]
  },
  server: {
    proxy: {
      "/api": {
        target: "http://buddyguard.site:8080",
        changeOrigin: true,
        rewrite: function(path2) {
          return path2.replace(/^\/api/, "");
        }
      }
    },
    sever: {
      port: 5173
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamluamFlaHdhbi9Eb2N1bWVudHMvQlVERFkvQnVkZHlHdWFyZC9mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2ppbmphZWh3YW4vRG9jdW1lbnRzL0JVRERZL0J1ZGR5R3VhcmQvZmUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ppbmphZWh3YW4vRG9jdW1lbnRzL0JVRERZL0J1ZGR5R3VhcmQvZmUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlYWN0KCksXG4gICAgICAgIHN2Z3Ioe1xuICAgICAgICAgICAgaW5jbHVkZTogWycqKi8qLnN2ZyddLFxuICAgICAgICB9KSxcbiAgICAgICAgVml0ZVBXQSh7XG4gICAgICAgICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgICAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ015IEF3ZXNvbWUgQXBwJyxcbiAgICAgICAgICAgICAgICBzaG9ydF9uYW1lOiAnQXdlc29tZUFwcCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdNeSBBd2Vzb21lIEFwcCBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICBpY29uczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgICAgICAnQHB1YmxpYyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3B1YmxpYycpLFxuICAgICAgICB9LFxuICAgICAgICBleHRlbnNpb25zOiBbJy5qcycsICcuanN4JywgJy50cycsICcudHN4JywgJy5zdmcnXSxcbiAgICB9LFxuICAgIHRlc3Q6IHtcbiAgICAgICAgZ2xvYmFsczogdHJ1ZSxcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICAgIHNldHVwRmlsZXM6ICcuL3NyYy90ZXN0L3NldHVwLnRzJyxcbiAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKi57dGVzdCxzcGVjfS57anMsbWpzLGNqcyx0cyxtdHMsY3RzLGpzeCx0c3h9J10sXG4gICAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJywgJ2Rpc3QnLCAnLmlkZWEnLCAnLmdpdCcsICcuY2FjaGUnXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2J1ZGR5Z3VhcmQuc2l0ZTo4MDgwJyxcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgICAgcmV3cml0ZTogZnVuY3Rpb24gKHBhdGgpIHsgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKTsgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNldmVyOiB7XG4gICAgICAgICAgICBwb3J0OiA1MTczLFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsT0FBTyxVQUFVO0FBQ2hWLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNELFNBQVMsQ0FBQyxVQUFVO0FBQUEsSUFDeEIsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ0osY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTyxDQUFDO0FBQUEsTUFDWjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsSUFDakQ7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxRQUFRLE1BQU07QUFBQSxFQUNyRDtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0YsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLElBQ1osU0FBUyxDQUFDLHNEQUFzRDtBQUFBLElBQ2hFLFNBQVMsQ0FBQyxnQkFBZ0IsUUFBUSxTQUFTLFFBQVEsUUFBUTtBQUFBLEVBQy9EO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLFNBQVVBLE9BQU07QUFBRSxpQkFBT0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQUc7QUFBQSxNQUNsRTtBQUFBLElBQ0o7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILE1BQU07QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
