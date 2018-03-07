const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pathApp = require('./paths');

const DEBUG = pathApp.processEnv !== 'production';

const presetsBabel = [
  'es2017',
  'stage-0',
  'react'
]

module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /(node_modules)/,
    query: {
      plugins: [
        'styled-components'
      ],
      env: {
        modules: false
      },
      presets: presetsBabel,
      cacheDirectory: true
    }
  },
  {
    test: /\.(png|ico|jpe?g|jpeg|gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        query: {
          limit: 10,
          context: pathApp.relAssetsPath,
          name: '[path][name].[hash:8].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(ttf|eot|otf|swf)(\?\S*)?$/i,
    exclude: /node_modules/,
    loader: 'url-loader',
    query: {
      limit: 10,
      context: pathApp.relAssetsPath,
      name: '[path][name].[ext]'
    }
  },
  {
    test: /\.woff(2)?(\?[a-z0-9]+)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      importLoaders: 1,
      mimetype: 'application/font-woff',
      context: pathApp.relAssetsPath,
      name: '[path][name].[ext]'
    }
  },
  {
    test: /\.css/,
    use: DEBUG ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }
]
