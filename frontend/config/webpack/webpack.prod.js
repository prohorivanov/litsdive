const webpack = require('webpack')
const pathApp = require('./paths')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const stats = {
  colors: true,
  hash: false,
  version: false,
  timings: false,
  assets: true,
  chunks: true,
  modules: false,
  reasons: false,
  children: true,
  source: false,
  errors: true,
  errorDetails: true,
  warnings: true,
  publicPath: false
}

module.exports = {
  context: process.cwd(),
  stats,
  devtool: '#hidden-source-map',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        exclude: /\.html/i,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BROWSER: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(pathApp.processEnv),
      BROWSER_SUPPORTS_HTML5: true
    })
  ]
}
