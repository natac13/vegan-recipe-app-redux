import express from 'express';
import path    from 'path';

// let app = express();

/*** Webpack imports ***/
import webpack          from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config           from './webpack.config.js';

const webpackOptions = {
    publicPath: config.output.publicPath,
    // needed so that when going to the localhost:3000 it will load the contents
    // from this directory
    contentBase: config.devServer.contentBase,
    hot: true,
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
const public_path = path.join(__dirname, 'public');

// app.use('/', express.static(public_path));


/*** during development I am using a webpack-dev-server ***/
if(isDevelopment) {
    new WebpackDevServer(webpack(config), webpackOptions)
    .listen(port, 'localhost', function(err) {
        if (err) { console.log(err); }
        console.log(`Listening on port: ${port}`);
    });
}
