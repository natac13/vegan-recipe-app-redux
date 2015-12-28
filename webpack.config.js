'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var buildPath = path.join(__dirname, 'build');
var entry = path.join(__dirname, 'app', 'index.js');


module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
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
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss', '.json', '.node', '.png']
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
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')

            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.node$/,
                loader: 'node-loader'
            },
            {
                test: /\.(jpe?g|png)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new ExtractTextPlugin('style.css', {allChunk: true}),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()

    ]
};