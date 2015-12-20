'use strict';

var path = require('path');
var webpack = require('webpack');

var buildPath = path.join(__dirname, 'assets');
var entry = path.join(__dirname, 'app', 'index.jsx');


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
        publicPath: '/assets/' // need for hot reload. or hit refresh each time
    },
    devServer: {
        // inline: true,
        progress: true,
        // Only appears to work when running server from CLI and not server.js
        contentBase: './',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()

    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react']
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