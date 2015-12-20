'use strict';

var path = require('path');
var webpack = require('webpack');


var buildPath = path.join(__dirname, 'assets');
var entry = path.join(__dirname, 'app', 'index.js');
module.exports = {
    // real source-map for production
    devtool: 'source-map',
    entry: [
        // sets up an ES6-ish environment with promise support
        'babel-polyfill',
        // the main application script
        entry
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/assets/' // need for hot reload. or hit refresh each time
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'app'),
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'app', 'scss'),
                loader: 'style!css!sass'

            }
        ]
    }
};