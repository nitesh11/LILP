var gulp = require('gulp'),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    gutil = require('gulp-util'),
    plumber    = require('gulp-plumber');

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', function () {
  gulp.src('./dist/css/main.css') // path to your file
  .pipe(minifyCss())
  .pipe(gulp.dest('./dist/css/min'));
});

var jsIncludes = [
  './src/js/bootstrap.min.js',
  // './src/js/jquery-3.3.1.min.js',
  './src/js/jquery.main.js'
]

gulp.task('concat', function () {
  gulp.src(jsIncludes) // path to your files
  .pipe(plumber())
  .pipe(concat('main.js'))  // concat and name it "concat.js"
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-js', function () {
  gulp.src('./dist/js/*.js') // path to your files
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js/min'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', ['concat', 'minify-js']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['concat', 'minify-js', 'sass', 'watch']);
