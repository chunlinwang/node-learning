const http = require('http');

const server = http.createServer((req, res) => {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', () => {
        console.log(data);
        console.log(req.url)
        console.log(req.headers)
        console.log(req.httpVersion)
        console.log(req.statusCode)
        console.log(req.method)
    })
    res.writeHead(200, {
        'content-type': 'text/plain'
    });

    res.end('Hello world '+ data);
} );

server.listen('3333', '127.0.0.1', () => {
    console.log('Listening to requests on port 3333');
});