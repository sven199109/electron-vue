const webpack = require('webpack')
const validate = require('webpack-validator')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const formatter = require('eslint-formatter-pretty')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let config = {
  entry: [
    './src/index.es6'
  ],

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    root: path.join(__dirname, '..', 'src'),
    extensions: ['', '.css', '.less', '.js', '.jsx', '.es6', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      'semantic': path.resolve(__dirname, '../node_modules/semantic-ui-css/')
    }
  },

  eslint: {
    formatter
  },

  module: {
    loaders: [
      {
        test: /\.es6$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-object-rest-spread', 'transform-runtime']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      },
      {
        // if Vue can not be compiled correct, remember that config your .babelrc or package.json
        // Important when your vue loader can not resolve the js code in vue files
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|woff2|svg)(\?[a-z0-9=\.]+)?$/i,
        loader: 'url-loader?limit=100000&name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.join(__dirname, '../src/index.html')
    }),
    new webpack.ProvidePlugin({
      $               : "jquery",
      jQuery          : "jquery",
      "window.jQuery" : "jquery",
      "root.jQuery"   : "jquery",
      semantic        : "semantic-ui-css",
      Semantic        : "semantic-ui-css",
      'semantic-ui'   : "semantic-ui-css"
    }),
    new ExtractTextPlugin('style.css')
  ]
}

module.exports = validate(config)
