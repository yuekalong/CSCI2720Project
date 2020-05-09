const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=http://csci2720.cse.cuhk.edu.hk/2050/__webpack_hmr',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HTMLWebpackPluginConfig
  ]
};
