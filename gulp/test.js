var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

var Server = require('karma').Server;

var run = require('gulp-run');

gulp.task('robohydra', function () {
  return run('robohydra robohydra/conf.json').exec();
})

/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/../karma.conf.js',
  }, done).start();
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
