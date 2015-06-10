'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require("babelify");

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");

var assign = require('object-assign');


gulp.task('lint', function () {
  gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// add custom browserify options here
var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
// add transformations here
// i.e. b.transform(coffeeify);
var b = watchify(browserify(opts))
  .transform(babelify);

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('build', function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
})
