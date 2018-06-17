const gulp = require('gulp');
const styleLint     = require('gulp-stylelint');
const eslint        = require('gulp-eslint');
const plugins = require('gulp-load-plugins')();
const config = require('./tasks/configs/main.config');
const register = require('./tasks/utils/register');
const gutil = require('gulp-util');
const onerror = function(err) {
    console.log(err.toString());
    gutil.beep();
    this.emit('end');
};

gulp.task('style-lint', function sassLintTask() {
    return gulp.src('./styles/**/*.scss')
        .pipe(styleLint({
            configFile    : '.stylelintrc',
            failAfterError: false,
            debug         : true,
            syntax        : 'scss',
            reporters     : [
                {formatter: 'string', console: true}
            ]
        }));
});

gulp.task('eslint', function() {
    return gulp.src('js/**')
        .pipe(eslint({
            configFile: '.eslintrc'
        }))
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

register(gulp, plugins, config, onerror)({
    'build:js'    : 'build-js',
    'clean:svg'   : 'clean-svg',
    'pug'         : 'pug',
    'imagemin'    : 'imagemin',
    'watch'       : 'watch',
    'serve'       : 'serve',
    'build:svg'   : 'build-svg',
    'build:styles': 'build-styles'
});

gulp.task('build', gulp.series('clean:svg', 'build:svg', 'imagemin', 'build:styles', 'pug', gulp.parallel('build:js')));

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));

gulp.task('imgmin', gulp.series('imagemin'));

gulp.task('lint', gulp.series('eslint'));
