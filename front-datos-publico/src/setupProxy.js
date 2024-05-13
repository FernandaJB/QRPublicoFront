const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

  app.use(
    '/email',
    createProxyMiddleware({
      target: 'http://192.168.246.110:8088/',
      changeOrigin: true,
    })
  );
};
