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

