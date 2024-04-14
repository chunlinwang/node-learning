const http = require('node:http');
const os = require('os');

const server = http.createServer((req, res) => {
    const data = new Array(1000000).fill('data');

    const inner = function () {
        console.log(data);
    }

    inner();

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${JSON.stringify(process.memoryUsage())}`);
});

server.listen(3333);