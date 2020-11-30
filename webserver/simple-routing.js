const http = require('http');

const server = http.createServer((
    req, res
) => {
    const path = req.url;
    switch (path) {
        case '/':
        case '/index.html':
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.end('<H1>Welcome</H1>')
            break;
        case '/products':
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.end('<H1>Products</H1>')
            break;
        default:
            res.writeHead(404, {
                'content-type': 'text/html',
                'my-header-error': 'error404'
            });
            res.end('<H1>Page not found!</H1>')
    }
});

server.listen(3333, '127.0.0.1', () => {
    console.log('Node server listening 127.0.0.1 on port 3333');
});
