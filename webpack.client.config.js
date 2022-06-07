const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/public/index.js",
  output: {
    path: path.join(__dirname, 'dist/public'),
    publicPath: "/",
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/public/img',
          to: 'img/[name][ext]',
          toType: 'template'
        },
        {
          from: 'src/public/img/catalog',
          to: 'img/catalog/[name][ext]',
          toType: 'template'
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html',
      excludeChunks: ['server']
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/pages/cart.html',
      filename: 'pages/cart.html',
      excludeChunks: ['server']
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/pages/catalog.html',
      filename: 'pages/catalog.html',
      excludeChunks: ['server']
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/pages/registration.html',
      filename: 'pages/registration.html',
      excludeChunks: ['server']
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/pages/product.html',
      filename: 'pages/product.html',
      excludeChunks: ['server']
    }),
    new CleanWebpackPlugin()
  ]
};