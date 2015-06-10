var gulp = require('gulp');


// so that we can write tests in es6
require('babel-core/register');

// register tasks
require('./build_scripts/bundle');
require('./build_scripts/test');


gulp.task("default", [
  'lint',
  'tdd',
  'js',
  'serve'
]);
