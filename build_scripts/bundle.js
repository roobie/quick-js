'use strict';

var _ = require('lodash');

var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');

//var changed = require('gulp-changed');
//var serve = require('gulp-serve');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});
//gulp.task('serve', serve('dist'));

gulp.task('lint', function () {
  gulp.src(['src/**/*.js', 'test/**/*.js'])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  // .pipe(eslint.failAfterError())
    .pipe(jscs());
});

gulp.task('watch-lint', ['lint'], function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['lint']);
});

// add custom browserify options here
var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = _.assign({}, watchify.args, customOpts);
// add transformations here
// i.e. b.transform(coffeeify);
var b = watchify(browserify(opts))
  .transform(babelify);

function bundle() {
  return b.bundle()
  // log errors if they happen
    .on('error', function (err) {
      gutil.log('Browserify Error:', err.message);
    })
    .pipe(source('bundle.js'))
  // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
  // optional, remove if you dont want sourcemaps
  // loads map from browserify file
    .pipe(sourcemaps.init({loadMaps: true}))
  // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});
