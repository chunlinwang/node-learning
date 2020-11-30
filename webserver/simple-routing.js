const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((
    req, res
) => {
    const path = req.url;

    const urlObj = url.parse(req.url);

    switch (urlObj.pathname) {
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
        case '/api':
            fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, buffer) => {
                const queryObj = qs.parse(urlObj.query);
                const objs = JSON.parse(buffer);
                if (err) {
                    res.writeHead(500, {
                        'content-type': 'application/json',
                    });
                    res.end({error: err.message});
                }

                const result = (queryObj.id === undefined) ? [] : objs.filter((obj) => obj.id == queryObj.id);

                res.end(JSON.stringify(result));
            });
            break;
        default:
            res.writeHead(404, {
                'content-type': 'text/html',
                'my-header-error': 'error404'
            });
            res.end('<H1>Page not found!</H1>')
            break;
    }
});

server.listen(3333, '127.0.0.1', () => {
    console.log('Node server listening 127.0.0.1 on port 3333');
});
