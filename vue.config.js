module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
              @import "@/assets/sass/home.scss";
              @import "@/assets/sass/login.scss";
              @import "@/assets/sass/main.scss";
              @import "@/assets/sass/reset.scss";
              @import "@/assets/sass/vars.scss";
              @import "@/assets/sass/userselect.scss";
        `
      }
    }
  },

  devServer: {
    proxy: {
      '/users': {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          '^users' : '' }
        },

        '/movies': {
          target: "http://localhost:8888/roku/api/index.php",
          changeOrigin: true,
          pathRewrite: {
            '^/movies' : '' }
          }
      }
    }
};
