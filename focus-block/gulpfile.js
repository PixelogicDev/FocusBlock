var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var scss_files = 'scss/**/*.scss';
var css_folder = 'public';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src(scss_files)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(css_folder));
});

gulp.task('watch', function () {
  gulp.watch(scss_files, gulp.series('sass'));
});