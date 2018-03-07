/* eslint-disable global-require */
const path = require('path')
const webpack = require('webpack')
const Manifest = require('manifest-revision-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const jsonPresent = require('./json-presenter')
const HtmlPlugin = require('html-webpack-plugin')
const pathApp = require('./paths')
const loaders = require('./loaders')

const STATIC_VERSION = process.env.STATIC_VERSION || '' // STATIC_VERSION='$(VERSION)' npm run build

process.noDeprecation = true

module.exports = {
  target: 'web',
  entry: [
    'babel-polyfill',
    path.join(pathApp.appPath, 'polyfill.js'),
    path.join(pathApp.appPath, 'app.jsx')
  ],
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: path.join('/', STATIC_VERSION, '/'),
    filename: 'js/[name].bundle.[hash:8].js',
    chunkFilename: '[name]-[id].[hash:8].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      './src',
      './node_modules/'
    ].map(p => path.resolve(p)),
    alias: pathApp.aliases
  },
  module: {
    noParse: /\.DS_Store/,
    rules: loaders
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        eslint: {
          configFile: '.eslintrc'
        }
      }
    }),

    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /ru/),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: false,
      allChunks: true
    }),
    new Manifest(path.join(process.cwd(), 'manifest.json'), {
      rootAssetPath: pathApp.relAssetsPath,
      ignorePaths: [
        '.DS_Store',
        '/index.html'
      ],
      format: jsonPresent
    }),
    new HtmlPlugin({
      title: 'Let\'s dive',
      inject: true,
      cache: false,
      filename: 'index.html',
      template: path.join(pathApp.appPath, 'index.html')
    }),

    new webpack.DefinePlugin({
      BROWSER: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(pathApp.processEnv),
      BROWSER_SUPPORTS_HTML5: true
    })
  ]
}
