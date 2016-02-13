const express = require('express');
const compression = require('compression');
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

// compress all responses
app.use(compression());

// set higher transfer limits
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

// Check if running in production
if (!isProduction) {
    // use the webpackmiddleware to serve up the transpiled files
    const webpackMiddleware    = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackMiddleware(compiler, webpackOptions));
    app.use(webpackHotMiddleware(compiler));

    // send the index.html at the root of the project.
    // Reason is that it looks for the bundle.js and stylesheet in the build
    // folder, where the index.html in app/ just looks at the same level.
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
    const imageUrl = req.body.imageUrl;
    const options = {
        public_id: name,
        cloud_name: 'dxmist0g2'
    };

    cloudinary.uploader.unsigned_upload(
        imageUrl,
        'normal',
        (result) => console.log(result),
        options
    );

});

module.exports = app;
