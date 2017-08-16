const webpack = require('webpack');
const pathApp = require('./paths');

const stats = {
  colors: true,
  hash: false,
  version: false,
  timings: false,
  assets: false,
  chunks: false,
  modules: false,
  reasons: false,
  children: false,
  source: false,
  errors: true,
  errorDetails: true,
  warnings: true,
  publicPath: false
};

module.exports = {
  context: process.cwd(),
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: pathApp.appPath,
    disableHostCheck: true,
    stats,
    // https: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080/',
        rewrite: function(req) {
          req.url = 'http://localhost:8080/' + req.url;
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/, http://localhost:8080/',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Content-Length, Accept, Authorization',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
