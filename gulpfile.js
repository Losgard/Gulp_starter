var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var notify      = require("gulp-notify");
var beeper      = require('beeper');

// Error Helper
function onError(err) {
    beeper();
    console.log(err);
}

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "mydevelopersite.dev"
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    gulp.src('assets/scss/**/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(notify("Hello Gulp!!"))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('.'))
        .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("assets/**/*.scss", ['sass']);
});