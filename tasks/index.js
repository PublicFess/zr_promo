'use strict';

var gulp = require('gulp')
  , async = require('async')
  , watch = require('gulp-watch')
  , batch = require('gulp-batch')
  , runSequence = require('run-sequence')
  , server = require('browser-sync').create();

require('./clean');
require('./html');
require('./css');
require('./scripts');

gulp.task('css:watch', function() {
  gulp.start('css');
  watch('src/**/*.sass', batch(function (events, done) {
    gulp.start('css', done);
  }));
});

gulp.task('html:watch', function() {
  gulp.start('html');
  watch('src/**/*.jade', batch(function (events, done) {
    gulp.start('html', done);
  }));
});

gulp.task('js:watch', function() {
  gulp.start('js');
  watch(['src/**/*.js'], batch(function (events, done) {
    gulp.start('js', done);
  }));
});

gulp.task('jsLibs:watch', function() {
  gulp.start('jsLibs');
  watch('src/libs/**/*.js', batch(function (events, done) {
    gulp.start('jsLibs', done);
  }));
});

gulp.task('dev:watcher', function () {
  watch('dist/**', batch({
    limit: 100
  }, function (events, done) {
    events.on('data', server.reload).on('end', done);
  }));
});

gulp.task('server', function() {
  server.init({
    server: {
      baseDir: "./dist"
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    }
  });
});

gulp.task('copyImg', function() {
  gulp.src('src/img/*')
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('build', function(cb) {
  runSequence(
    'css:watch',
    'html:watch',
    'js:watch',
    'jsLibs:watch',
    'dev:watcher',
    'copyImg',
    'server',
    cb)
});
