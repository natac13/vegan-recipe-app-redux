#!/usr/bin/env node
const app = require('../server.js');

const isDevelopment = process.env.NODE_ENV !== 'production';
const host = process.env.HOST || '0.0.0.0';
const port = isDevelopment ? 3023 : process.env.PORT;
app.listen(port, host, 'localhost', () => {
    console.log('Listening on Port ' + port);
});