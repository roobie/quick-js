var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var babel = require("gulp-babel");

var karma = require('karma').server;
/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done);
});


/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/../karma.conf.js'
  }, done);
});

gulp.task('test', function() {
  return gulp.src('test/**/*.js')
    .pipe(babel())
    .pipe(mocha({
      reporter: 'spec',
      globals: ['expect']
    }));
});

gulp.task('mocha', function() {
    return gulp.src(['test/server/**/*.js'], { read: false })
      .pipe(babel())
      .pipe(mocha({ reporter: 'list' }))
      .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['src/**', 'test/server/**'], ['mocha']);
});

gulp.task('test-suite', [
  'karma',
  'mocha'
]);
