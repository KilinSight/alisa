const config = require('./configs/main.config');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');

module.exports = (gulp, plugins, config) => () => {
    let pipeline = gulp.src(`${config.paths.indexStyle}`)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: "Hey man, error occured in your Styles, let's repair it",
                message: err.message,
            }))
        }));

    if (config.isDevelopment) {
        pipeline = pipeline
            .pipe(plugins.sourcemaps.init());
    }

    pipeline = pipeline
        .pipe(plugins[`${config.preprocessor}`]())
        .pipe(plugins.postcss(config.postcssConfig))
        .pipe(plugins.cssimport());

    if (!config.isDevelopment) {
        pipeline = pipeline
            .pipe(gcmq())
            .pipe(csso());
    }
    pipeline = pipeline
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.concat('style.css'));

    return pipeline.pipe(gulp.dest(`${config.paths.dist}/${config.output.css}/`));
};
