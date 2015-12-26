import express from 'express';
import path    from 'path';

let app = express();

const public_path = path.join(__dirname, 'build');
const port = 8080;
app.use('/', express.static(public_path));

app.listen(port, function() {
    console.log('Listening on Port ' + port);
});