var gulp = require('gulp');


// so that we can write tests in es6
require('babel-core/register');

// register tasks
require('./gulp/assets');
require('./gulp/bundle');
require('./gulp/test');

gulp.task('default', [
  'lint',
  'watch-lint',
  'robohydra',
  'less',
  'watch-less',
  'tdd',
  'mocha',
  'watch-mocha',
  'js',
  'serve'
]);
