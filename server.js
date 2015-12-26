// import express from 'express';
// import path    from 'path';

// let app = express();

/*** Webpack imports ***/
import webpack          from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config           from './webpack.config.js';
// import webpackMiddleware    from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';

const webpackOptions = {
    publicPath: config.output.publicPath,
    // needed so that when going to the localhost:3000 it will load the contents
    // from this directory
    // contentBase: './build/',
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

let compiler = webpack(config);
// app.use('/', express.static(public_path));

// app.use(webpackMiddleware(compiler, webpackOptions));
// app.use(webpackHotMiddleware(compiler));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
// app.listen(port, function() {
//     console.log('Listening on Port ' + port);
// });


/*** during development I am using a webpack-dev-server ***/
if(isDevelopment) {
    new WebpackDevServer(compiler, webpackOptions)
    .listen(port, 'localhost', function(err) {
        if (err) { console.log(err); }
        console.log(`Listening on port: ${port}`);
    });
}
