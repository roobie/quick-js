var gulp = require('gulp');


// so that we can write tests in es6
require('babel-core/register');

// register tasks
require('./build_scripts/assets');
require('./build_scripts/bundle');
require('./build_scripts/test');


gulp.task("default", [
  'lint',
  'watch-lint',
  'less',
  'watch-less',
  'tdd',
  'mocha',
  'watch-mocha',
  'js',
  'serve'
]);
