import express from 'express';
import path    from 'path';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';

/*** Webpack imports ***/
import webpack  from 'webpack';
import config   from './webpack.config.js';
import fs from 'fs';

import webpackMiddleware    from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

let app = express();

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
const isDevelopment = process.env.NODE_ENV !== 'production';
const staticPath = path.join(__dirname, 'build');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (!isProduction) {
    app.use(webpackMiddleware(compiler, webpackOptions));
    app.use(webpackHotMiddleware(compiler));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

} else {
    app.use(express.static(staticPath))
        .get('/', (req, res) => {
            res.sendFile('index.html', {
                root: staticPath
            });
        });

}

app.all('/img', (req, res) => {

    const { name, imageUrl } = req.body;
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

const port = isDevelopment ? 3023 : process.env.PORT;
app.listen(port, 'localhost', () => {
    console.log('Listening on Port ' + port);
});
