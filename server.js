const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

/*** Webpack imports ***/
const webpack  = require('webpack');
const config   = require('./webpack.config.js');
const fs = require('fs');


var app = express();

const compiler = webpack(config);
const webpackOptions = {
    publicPath: config.output.publicPath,
    quiet: false,
    // hides all the bundling file names
    noInfo: true,
    // adds color to the terminal
    stats: {
        colors: true
    }
};
const isProduction = process.env.NODE_ENV === 'production';
const staticPath = path.join(__dirname, 'build');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (!isProduction) {
    const webpackMiddleware    = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackMiddleware(compiler, webpackOptions));
    app.use(webpackHotMiddleware(compiler));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

} else {
    app.use(express.static(staticPath))
        .get('*', (req, res) => {
            res.sendFile(path.join(staticPath, 'index.html'));
        });

}

app.all('/img', (req, res) => {

    const name = req.body.name;
    const imageUrl = req.body.imageUrl
    const configFile = require('./cloudinary.config.json');
    cloudinary.config(configFile);
    const options = {
        public_id: name,
        format: 'png'
    };

    cloudinary.uploader.upload(
        imageUrl,
        (result) => console.log(result),
        options
    );
});

module.exports = app;
