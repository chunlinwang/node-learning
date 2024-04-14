const http = require('node:http');
const os = require('os');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${JSON.stringify(process.memoryUsage())}`);
});
