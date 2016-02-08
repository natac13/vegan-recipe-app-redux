#!/usr/bin/env node
const app = require('../server.js');

const isDevelopment = process.env.NODE_ENV !== 'production';

const port = isDevelopment ? 3023 : process.env.PORT;
app.listen(port, 'localhost', () => {
    console.log('Listening on Port ' + port);
});