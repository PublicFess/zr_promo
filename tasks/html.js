var gulp = require('gulp')
  , jade = require('gulp-jade')
  , errorHandler = require('./errorHandler')()
  , paths = ['src/**/*.jade',
    '!src/**/_*.jade'];

gulp.task('html', function() {
  gulp.src(paths)
    .pipe(jade({
      pretty: true
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist'));
});
