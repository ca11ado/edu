exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    historyApiFallback: true
    /*overlay: {
      errors: true,
      warnings: true,
    },*/
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

exports.loadReact = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=env&presets[]=react'
      }
    ]
  }
});

