const webpack = require('webpack');
const pathApp = require('./paths');

const stats = {
  colors      : true,
  hash        : false,
  version     : false,
  timings     : false,
  assets      : true,
  chunks      : true,
  modules     : false,
  reasons     : false,
  children    : true,
  source      : false,
  errors      : true,
  errorDetails: true,
  warnings    : true,
  publicPath  : false
};

let conf = {
  context: process.cwd(),
  stats,
  devtool: '#hidden-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      exclude  : /\.html/i,
      minimize : true,
      sourceMap: false,
      compress : {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      BROWSER               : JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(pathApp.processEnv),
      BROWSER_SUPPORTS_HTML5: true
    })
  ]
};

if (process.env.PRED_PROD) {
  conf = {
    context  : process.cwd(),
    stats,
    devtool  : '#inline-source-map',
    devServer: {
      contentBase       : pathApp.appPath,
      stats,
      hot               : true,
      inline            : true,
      historyApiFallback: true,
    },
    plugins  : [
      new webpack.optimize.UglifyJsPlugin({
        exclude  : /\.html/i,
        minimize : true,
        sourceMap: true,
        compress : {
          warnings: false
        }
      })
    ]
  };
}

module.exports = conf;
