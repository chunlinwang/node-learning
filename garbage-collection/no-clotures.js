const http = require('node:http');
const os = require('os');

function getData() {
  const data = new Array(1000000).fill('data');

  console.log(data);
}

const server = http.createServer((req, res) => {
  getData();

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`${JSON.stringify(process.memoryUsage())}`);
});

server.listen(3334);  