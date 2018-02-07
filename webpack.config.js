
const webpack = require('webpack')
const path = require('path')
const version = require('./package.json').version
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, `docs/${version}`)

module.exports = {
  entry: `./index.js`,

  output: {
    path: dist,
    pathinfo: true,
    publicPath: './',
    filename: 'consoleLogComponent.js',
    library: "ConsoleLogComponent",
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
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: 4
    })
  ]
}
