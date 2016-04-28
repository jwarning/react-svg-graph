var path = require('path')
var webpack = require('webpack')

var config = {
  entry: [
    './index'
  ],
  output: {
    path: './dist',
    filename: 'index.js',
    library: 'react-svg-graph',
    libraryTarget: 'umd'
  },
  externals: ['react'],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: '/node_modules/',
        include: __dirname
      }
    ]
  }
}

module.exports = config
