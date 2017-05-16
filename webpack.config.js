const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: {
    app: [
      './src/app.js'
    ]
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: ExtractTextPlugin.extract({
          fallback: [{
            loader: 'style-loader'
          }],
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }]
        })
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              'react'
            ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('styles.css')
  ],

  devServer: {
    inline: true,
    port: 3000,
    hot: true
  }
}
