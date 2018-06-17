

module.exports = (gulp, plugins, config) => () => {
    global.watch = true;
    gulp.watch(config.paths.styles, gulp.series('build:styles'));
    gulp.watch(config.paths.pug, gulp.series('pug'));
    gulp.watch(config.paths.imagmin, gulp.series('clean:svg', 'imagemin', 'build:svg'));
    gulp.watch(config.paths.svg_sprite, gulp.series('clean:svg', 'imagemin', 'build:svg'));
};
