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
      { test: /\.js$/, loader: 'esnext' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.html$/, loader: "html" }
    ]
  }
};
