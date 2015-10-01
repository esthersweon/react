var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./src/app.js'],
    transform: [reactify], // JSX to Javascript
    debug: true, // source maps
    cache: {}, 
    packageCache: {}, 
    fullPaths: true // watchify requirement
  });

  var watcher  = watchify(bundler);

  return watcher.on('update', function () {
    var updateStart = Date.now();
    watcher.bundle()
    .pipe(source('bundle.min.js'))
    .pipe(gulp.dest('./build/scripts/'));
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
  })
  .bundle() // Create the initial bundle when starting the task
  .pipe(source('bundle.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('clean', function() {
  return gulp.src('./build/scripts/*.js', {read: false})
    .pipe(clean());
});

// Just running the two tasks
gulp.task('default', ['clean', 'browserify']);