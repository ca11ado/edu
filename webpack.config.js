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

const commonConfig = {
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

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules\/(?!(t0s-components)\/).*/, loader: 'babel-loader?presets[]=env&presets[]=react' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')}
    ]
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

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
