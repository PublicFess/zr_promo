var gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , reload = require('browser-sync').reload
  , errorHandler = require('./errorHandler')();

gulp.task('css', function() {
  gulp.src(['src/css/*.sass',
    '!src/css/_*.sass'])
    .pipe(sass().on('error', errorHandler))
    .pipe(autoprefixer({
      browsers: ['last 10 versions']
    }))
    .pipe(gulp.dest('./dist/'));
});
