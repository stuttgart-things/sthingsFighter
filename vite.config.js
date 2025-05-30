// vite.config.js
export default {
  server: {
    proxy: {
        '/events': 'http://localhost:3000', // Proxy for SSE server
        '/generic': {
          target: 'https://andre-panda-lab.labul.sva.de',
          changeOrigin: true,
          secure: false, // <--- disables SSL certificate verification
        },
    },
  },
};
