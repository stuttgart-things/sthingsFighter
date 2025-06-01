// vite.config.js

import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd());

return defineConfig({
  server: {
    proxy: {
        '/events': env.VITE_SSE_PROXY || 'http://localhost:3000', // Proxy for SSE server
        '/generic': {
          target: env.VITE_GENERIC_PROXY,
          changeOrigin: true,
          secure: false, // <--- disables SSL certificate verification
        },
    },
  },
});
};
