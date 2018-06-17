const path = require('path');
const webpack = require('webpack-stream').webpack;
const config = require('./main.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(process.env.NODE_ENV);

// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const isDevelopment = true;

console.log(`build is ${isDevelopment}`);

const pluginsProd = [

    new UglifyJSPlugin({
        sourceMap: false,
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),
];

const pluginsDev = [
    new webpack.NoEmitOnErrorsPlugin(),

];

const plugins = isDevelopment ? pluginsDev : pluginsProd;

console.log(plugins);

module.exports = {
    watch: isDevelopment,

    entry: config.paths.entry,

    devtool: isDevelopment ? 'eval' : 'hidden-source-map', // settings source-map

    output: {
        publicPath: '/assets/js/',
        path: '/web/front/js/',
        filename: 'bundle.js',
        // filename: 'bundle.[chunkhash].js',
        // publicPath: '/public/js/',
        // filename: 'bundle.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            API: JSON.stringify(process.env.API),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        // new HtmlWebpackPlugin({
        //     title: 'Custom template',
        //     template: 'about.html',
        //     filename: 'about.html',
        //     chunks: ['about'],
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.js',
        //     minChunks: 2,
        // }),
        ...plugins,
    ],

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
            use: [
                {
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'stage-0', 'react'] },
                }
            ],
        },

        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: { presets: ['react'] },
                }
            ],
        },

    ],
    },
};

