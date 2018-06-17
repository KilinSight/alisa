const clean = require('gulp-clean');

module.exports = (gulp, plugins, config) => {
    return () => {
        return gulp.src([
            `./${config.paths.dist}/${config.output.sprite}/*`
        ]).pipe(plugins.clean())
    } 
};
