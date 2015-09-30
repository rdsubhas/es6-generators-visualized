var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var port = process.env.port || 8000;

gulp.task('connect', function () {
  connect.server({
    root: '.',
    hostname: 'localhost',
    port: port,
    livereload: true
  });
});

gulp.task('browserify', function() {
  gulp.src('js/app.jsx')
    .pipe(browserify({
      transform: ['babelify', 'reactify']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
  gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('reload', function() {
  gulp.src('./build/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['js/**/*.js', 'js/**/*.jsx'], function () {
    gulp.start('browserify');
  });
  gulp.watch(['css/**/*.scss'], function () {
    gulp.start('sass');
  });
  gulp.watch('index.html', ['reload']);
  gulp.watch('build/**/*', ['reload']);
});

gulp.task('default', ['browserify', 'sass']);
gulp.task('serve', ['default', 'connect', 'watch']);
