
const webpack = require('webpack')
const path = require('path')
const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: `${src}/index.js`,

  output: {
    path: dist,
    pathinfo: true,
    publicPath: './',
    filename: 'index.js',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            }
          },
          'postcss-loader',
          'less-loader',
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    modules: [__dirname, 'node_modules'],
    alias: {
      'src'      : src,
      'css'      : `${src}/css`,
      'js'       : `${src}/js`,
      'classes'  : `${src}/js/classes`,
      'methods'  : `${src}/js/methods`,
      'services' : `${src}/js/services`,
    },
  }
}
