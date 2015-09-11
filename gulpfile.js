var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');

function bundle (bundler) {
    return bundler
        .bundle()
        .on('error', function (e) {
            gutil.log(e.message);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js/dist'));
}

gulp.task('watch', function () {
    var watcher = watchify(browserify('./app/js/app.js', watchify.args));

    bundle(watcher);

    watcher.on('update', function () {
        bundle(watcher);
    });

    watcher.on('log', gutil.log);
});

gulp.task('js', function () {
    return bundle(browserify('./app/js/app.js'));
});