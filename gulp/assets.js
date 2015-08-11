'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");

var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('src/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat("bundle.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch-less', function () {
    gulp.watch(['src/**/*.less'], ['less']);
});
