var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  return browserify('index.js')
  .transform(babelify)
  .bundle()
  .pipe(source('react-svg-graph.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('dist'));
});

gulp.task('example', function () {
  return browserify('app.js')
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'example']);
