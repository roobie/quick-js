var gulp = require('gulp');
var gutil = require('gulp-util');

var babel = require('gulp-babel');

var mocha = require('gulp-mocha');
var KarmaServer = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('watch-karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/../karma.conf.js'
  }, done).start();
});

gulp.task('mocha', function() {
  require('babel-core/register');
  return gulp.src(['test/server/**/*.js'], { read: false })
    .pipe(babel())
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', ['mocha'], function() {
  gulp.watch(['src/**', 'test/server/**'], ['mocha']);
});

gulp.task('test-suite', [
  'karma'//,
  //'mocha'
]);
