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
    // webpack-hot-middleware needs this
    'webpack-hot-middleware/client',
    // the main application script
    entry
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/' // need for hot reload. or hit refresh each time
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.scss',
      '.json',
      '.node',
      '.png'
    ]
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass!toolbox-loader')

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
        test: /\.(jpe?g|png|gif)$/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name]_[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  postcss: [autoprefixer],
  toolbox: { theme: 'theme.scss' },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunk: true }),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};