import express from 'express';
import path    from 'path';


/*** Webpack imports ***/
import webpack  from 'webpack';
import config   from './webpack.config.js';

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

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? 3023 : process.env.PORT;

app.use(webpackMiddleware(compiler, webpackOptions));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, 'localhost', function() {
    console.log('Listening on Port ' + port);
});