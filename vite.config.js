// vite.config.js
export default {
  server: {
    proxy: {
      '/generic': {
        target: 'https://andre-panda-lab.labul.sva.de',
        changeOrigin: true,
        secure: false, // <--- disables SSL certificate verification
      },
    },
  },
};
