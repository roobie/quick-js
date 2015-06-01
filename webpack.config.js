module.exports = {
  devtool: 'eval',
  debug: true,

  entry: {
    app: ['webpack/hot/dev-server', './src/index.js']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.html$/, loader: "html" }
    ]
  }
};
