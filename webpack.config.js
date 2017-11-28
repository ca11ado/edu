let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require('path');

const PRODUCTION_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings: true
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin()
];

module.exports = {
  entry: './src/frontend/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    ...(process.env.NODE_ENV === 'production' ? PRODUCTION_PLUGINS : []),
    new ExtractTextPlugin('[name].css')
  ],

  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      { test: /\.js$/, exclude: /node_modules\/(?!(t0s-components)\/).*/, loader: 'babel-loader?presets[]=env&presets[]=react' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')},
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

