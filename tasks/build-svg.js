
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

module.exports = (gulp, plugins, config) => () => gulp.src(`${config.paths.svg_sprite}`)
    .pipe(plumber({
        errorHandler: notify.onError(err => ({
            title: "Hey guy, error occured in durring SVG, let's repair it",
            message: err.message,
        })),
    }))
    .pipe(plugins.svgSprite({
        shape:
       {
           spacing:
         {
             padding: 1,
         },
       },
        mode: {
            dest: '',
            css: {
                dest: 'public/css',
                sprite: '../images/sprite/sprite.svg',
                prefix: '@mixin svg-%s',
                mixin: 'svg-common',
                bust: true,
                dimensions: true,
                example: false,
                render: config.preprocessor === 'sass' ? {
                    scss: {
                        dest: '../../styles/service/sprite.scss',
                    },
                } :
                    {
                        less: {
                            dest: '../../styles/service/sprite.less',
                        },
                    },
            },
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
        },
    }))
    .pipe(gulp.dest('.'));
