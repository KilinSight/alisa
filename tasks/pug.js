const pug       = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const changed       = require('gulp-changed');
const gulpif        = require('gulp-if');
const cached        = require('gulp-cached');
const browserSync   = require('browser-sync').create();
const pugInheritance = require('gulp-pug-inheritance');
// const emitty = require('emitty').setup('pug', 'pug');

const onError = notify.onError('Line: <%= error.lineNumber %>: <%= error.message %>\n<%= error.fileName %> title: <%= error.plugin %>');

module.exports = (gulp, plugins, config) => {
    return () => {
        let pipeline = gulp.src(`${config.paths.pug}`)
        // let pipeline = gulp.src(`pug/**/*.pug`)
            .pipe(plumber({
                errorHandler: onError
            }))
            // .pipe(changed('./public', {extension: '.html'}))
            // .pipe(cached('pug'))
            // .pipe(pugInheritance({basedir: './pug', skip: 'node_modules'}))
            // .pipe(gulpif(global.watch, emitty.stream()))
            .pipe(pug({
                pretty: true
            }))
            .pipe(plumber.stop())
            // .pipe(browserSync.stream());

        return pipeline.pipe(gulp.dest(`${config.paths.dist}`));
    } 

    
};
