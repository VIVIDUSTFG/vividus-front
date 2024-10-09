import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from "@astrojs/node";
const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
  site: process.env.PROD_URL || `http://localhost:${DEV_PORT}`,
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),
  
  security: {
    checkOrigin: true,
  },

  server: {
    /* Dev. server only */
    port: DEV_PORT
  },
  integrations: [sitemap(), tailwind()],
  
  vite: {
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    }
  },

});