var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var notify = require("gulp-notify");

var scriptsDir = './src';
var buildDir = './build/scripts';

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); 
}

function buildScript(file, watch) {
  var props = {
    entries: [scriptsDir + '/' + file], 
    debug: true, 
    cache: {}, 
    packageCache: {}
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  bundler.transform(reactify);
  
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', handleErrors)
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(buildDir + '/'));
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  return rebundle();
}

gulp.task('clean', function() {
  return gulp.src(buildDir + '/*.js', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], function() {
  return buildScript('app.js', false);
});

gulp.task('default', ['build'], function() {
  return buildScript('app.js', true);
});