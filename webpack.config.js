var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var minify = process.env.MINIFY || false;
var TapSpecWebpackPlugin = require('./scripts/tap-spec-webpack-plugin');

var eslintLoader = {
  test: /\.js$/,
  loaders: ['eslint'],
  include: path.resolve('./source')
};

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true
});


module.exports = [
  // test bundle configuration
  {
    target: 'node',
    entry: './test/index.js',
    output: {
      path: 'output',
      filename: 'test.js'
    },
    plugins: [
      new TapSpecWebpackPlugin()
    ],
    module: {
      preLoaders: [
        eslintLoader
      ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-1'],
            plugins: ['transform-object-assign']
          }
        }
      ]
    },
    eslint: {
     configFile: './.eslintrc'
    }
  },
  {
    devtool: 'sourcemap',
    entry: './source/index.js',
    output: {
      filename: minify ? 'index.min.js' : 'index.js',
      path: path.resolve('./build')
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"' + env + '"'
        }
      }),
    ].concat(minify ? [uglifyPlugin] : []),
    module: {
      preLoaders: env === 'development' ? [
        eslintLoader
      ] : [],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-1'],
            plugins: ['transform-object-assign']
          },
          include: path.resolve('./source')
        }
      ]
    },
    resolve: {
      extensions: ['', '.js']
    },
    stats: {
      colors: true
    },
    eslint: {
      configFile: './.eslintrc'
    }
  }
];
