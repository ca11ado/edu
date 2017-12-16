const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require("webpack-merge");

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, "src/frontend"),
  build: path.join(__dirname, "public"),
};

const commonConfig = merge([{
  entry: PATHS.app,

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.app, 'index.html')
    })
  ],

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}, parts.loadCSS(), parts.loadReact()
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: 3008 // process.env.PORT
  })
]);

module.exports = env => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
