'use strict';

// include node fs for building index.html
var fs = require('fs');

// include gulp
var gulp = require('gulp');

// include plug-ins
  var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html');

/**
 * Dependencies will be concatenated in the order stated here. If not defined, gulp will
 * concatenate in the order found in the filesystem.
 */
var cssLocations = [
  './src/css/**/*.css',
  './src/css/**/*.scss'
];

/**
 * Dependencies will be concatenated in the order stated here. If not defined, gulp will
 * concatenate in the order found in the filesystem.
 */
var jsLocations = [
  './src/js/vendor/jquery-2.1.4.min.js',
  './src/js/**/*.js'
];

var imgLocations = [];

var fontLocations = [
  './src/fonts/**/*.otf'
];

var cssBuildLocation = './build/css';
var jsBuildLocation = './build/js';
var imgBuildLocation = './build/img';
var fontBuildLocation = './build/fonts';

/**
 * Processes css/sass files from multiple locations, minifies, and concatenates them.
 * Puts the minified file in the specified build location
 */
gulp.task('js', function() {
  var opts = {
    mangle: false
  }

  gulp.src(jsLocations)
    .pipe(uglify(opts))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(jsBuildLocation));
});


/**
 * Processes js files from multiple locations, minifies, and concatenates them.
 * Puts the minified file in the specified build location
 */
gulp.task('css', function() {
  gulp.src(cssLocations)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest(cssBuildLocation));
});


/**
 * Processes image files from multiple locations.
 * Puts the processed images in the specified build location.
 */
gulp.task('img', function() {
  gulp.src(imgLocations)
    .pipe(gulp.dest(imgBuildLocation));
});


/**
 * Watches for changes in the css and runs the 'css' task whenever a change is saved.
 * Does not generate new files.
 *
 */
gulp.task('css:watch', function() {
  gulp.watch(cssLocations, ['css']);
});

gulp.task('fonts', function() {
  gulp.src(fontLocations)
    .pipe(gulp.dest(fontBuildLocation));
});

/**
 * Watches for changes in the js and runs the 'js' task whenever a change is saved.
 * Does not generate new files.
 *
 */
gulp.task('js:watch', function() {
  gulp.watch(jsLocations, ['js']);
});


gulp.task('process-html', function() {
  var opts = {
    empty: true,
    cdata: true,
    conditionals: true,
    spare: true,
    quotes: true
  };

  gulp.src('./src/index.html')
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest('./build'));

  gulp.src('./src/views/**/*.html')
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest('./build/views'));
});

/**
 * Sets the default gulp task to run the css, js, and img tasks
 *
 */
gulp.task('default', ['css', 'js', 'img', 'fonts', 'process-html']);


/**
 * Watches for changes in the project and runs the 'default' task whenever a change is saved.
 * Does not generate new files.
 *
 */
gulp.task('watcher:watch', function() {
  gulp.watch('./src/**/*.*', ['default']);
});