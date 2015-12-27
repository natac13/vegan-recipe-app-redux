'use strict';


const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



var buildPath = path.join(__dirname, 'build');
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
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'app'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')

            },
            {
                test: /\.json$/,
                loader: 'json'
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
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]
};