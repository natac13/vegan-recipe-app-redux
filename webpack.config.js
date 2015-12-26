'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

var buildPath = path.join(__dirname, 'build');
var entry = path.join(__dirname, 'app', 'index.js');


module.exports = {
    devtool: 'eval',
    entry: [
        // sets up an ES6-ish environment with promise support
        'babel-polyfill',
        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:3023',
        // For hot style updates
        'webpack/hot/only-dev-server',
        // the main application script
        entry
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/' // need for hot reload. or hit refresh each time
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()

    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'app', 'scss'),
                loader: 'style!css!postcss!sass'

            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: [autoprefixer]
};