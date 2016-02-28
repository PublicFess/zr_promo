var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , errorHandler = require('./errorHandler')();

gulp.task('js', function() {
  gulp.src(['src/app.js'])
    .pipe(browserify())
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist'));
});

gulp.task('jsLibs', function() {
  gulp.src('src/libs/**/*.js')
    .pipe(gulp.dest('./dist/js'));
});
