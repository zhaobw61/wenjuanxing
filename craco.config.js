const CracoLessPlugin = require("craco-less");
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001/'
    }
  },
  plugins: [{ plugin: CracoLessPlugin }],
};