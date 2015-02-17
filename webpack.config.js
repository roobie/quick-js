module.exports = {
  devServer: true,
  devtool: 'eval',
  debug: true,
  entry: "./src/index.js",
  output: {
    path: __dirname + '/src/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'esnext' },
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
