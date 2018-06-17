const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const onError = notify.onError('Line: <%= error.lineNumber %>: <%= error.message %>\n<%= error.fileName %> title: <%= error.plugin %>');

module.exports = (gulp, plugins, config) => {
    return () => {
        let pipeline = gulp.src(`${config.paths.imagmin}`)
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                // imageminJpegRecompress({
                //     loops  : 5,
                //     min    : 65,
                //     max    : 70,
                //     quality: 'medium'
                // }),
                // imagemin.svgo(),
                imagemin.optipng({optimizationLevel: 3}),
                pngquant({quality: '65-70', speed: 5})
            ], {
                verbose: true
            }))
            .pipe(plumber.stop())

        return pipeline.pipe(gulp.dest(`${config.paths.img}`));
    }
};

