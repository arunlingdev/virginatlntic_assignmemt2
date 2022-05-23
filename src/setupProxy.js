const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/cjs-search-api',
    createProxyMiddleware({
      target: 'https://www.virginholidays.co.uk/',
      changeOrigin: true,
    })
  );
};
