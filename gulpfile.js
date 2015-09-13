var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var beeper = require('beeper');

// Error Helper
function onError(err) {
  beeper();
  console.log(err);
}

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "sitename.dev"
  });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  gulp.src('assets/scss/**/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(notify("Hello Gulp!!"))
    .pipe(gulp.dest('.'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'autoprefixer', 'browser-sync'], function() {
  gulp.watch("assets/**/*.scss", ['sass']);
  gulp.watch("*.css", ['autoprefixer']);
});