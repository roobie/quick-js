var gulp = require('gulp');

// register tasks
require('./build_scripts/bundle');
require('./build_scripts/test');

gulp.task('default', [
  'lint',
  'watch-lint',
  'watch-karma',
  //'watch-mocha',
  'js',
  'serve'
]);
