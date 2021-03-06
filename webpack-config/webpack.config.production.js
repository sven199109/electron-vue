const webpack = require('webpack')
const merge = require('webpack-merge')
const validate = require('webpack-validator')
const baseConfig = require('./webpack.config.base')

let config = merge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})

module.exports = validate(config)
