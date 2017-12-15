const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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

const productionConfig = () => {
  const config = {};

  return Object.assign({}, commonConfig, config);
};
const developmentConfig = () => {
  const config = {
    devServer: {
      stats: 'errors-only',
      host: process.env.HOST,
      port: 3008,//process.env.PORT
      historyApiFallback: true
    }
  };
  
  return Object.assign({}, commonConfig, config);
};

module.exports = env => {
  if (env === 'production') {
    return productionConfig()
  }
  return developmentConfig();
};
