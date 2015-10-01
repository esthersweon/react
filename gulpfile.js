var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');

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
    watcher.bundle() // Create new bundle that uses cache for high performance
    .pipe(source('main.js'))
    // Add uglifying etc.
    .pipe(gulp.dest('./build/'));
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
  })
  .bundle() // Create the initial bundle when starting the task
  .pipe(source('main.js'))
  .pipe(gulp.dest('./build/'));
});

// Just running the two tasks
gulp.task('default', ['browserify']);