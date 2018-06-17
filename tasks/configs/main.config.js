const autoprefixer = require('autoprefixer');
const inlineSvg = require('postcss-inline-svg');
const flexbugs = require('postcss-flexbugs-fixes');
const assets = require('postcss-assets');
// const react = require('react');
// const reactDom = require('react-dom');
// const classnames = require('classnames');
// const babelPolyfill = require('babel-polyfill');

let config = {
    tasks        : './tasks',
    preprocessor : 'sass',
    isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    postcssConfig: [
        autoprefixer({ browsers: ['last 2 versions'] }),
        assets({
            baseUrl  : './assets',
            loadPaths: ['svg-icons/', 'images/']
        }),
        inlineSvg(),
        flexbugs()
    ],
    paths: {
        // JS
        // entry: {
        //     index: './js/index.js'
        // },

         entry: {
            'index': ['babel-polyfill', './assets/js/index.js'],

         },

        
        js        : './assets/js/**/**/*.{js,jsx}',
        // SVG
        svg_sprite: './assets/svg-sprite/**/*.svg',
        // DIST
        dist      : './web/front'
    },
    output: {
        js    : 'js',
        css   : 'css',
        images: 'images',
        svg   : 'svg',
        sprite: 'images'
    }
};
// STYLES
config.paths.styles = config.preprocessor === 'sass' ? ['./assets/styles/**/*.scss', './assets/styles/**/*.css'] : ['/assets/styles/**.less', '/assets/styles/layout/**.less', './styles/pages/**.less', './styles/plugins/**.less', './styles/service/**.less'];
config.paths.indexStyle = config.preprocessor === 'sass' ? ['./assets/styles/index.scss'] : ['./assets/styles/index.less'];
config.paths.pug = './assets/pug/**/*.pug';
config.paths.imagmin = './assets/img_min/**/*';
config.paths.img = './web/front/images/';
config.paths.js = './web/front/js';

module.exports = config;
