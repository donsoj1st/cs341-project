const http = require('http');

const route = require('./prove01-routes');


const server = http.createServer(route);

server.listen(3000);