const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const { replaceTemplate } = require('./modules/replaceTemplate')

const server = http.createServer((
    req, res
) => {
    const path = req.url;

    const { query, pathname} = url.parse(req.url, true);

    switch (pathname) {
        case '/':
        case '/index.html':
        case '/overview':
            fs.readFile(`${__dirname}/overview.html`, 'utf-8', (err, buffer) => {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });

                const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
                const tempCards = fs.readFileSync(`${__dirname}/template-card.html`, 'utf-8');
                const objs = JSON.parse(data);

                const temps = objs.map((obj) => {return replaceTemplate(tempCards, obj);});

                const cards = temps.reduce((p, c) => {
                    return p+c;
                }, '')

                const template = buffer.toString();
                
                res.end(template.replace(/{%PRODUCT_CARDS%}/g, cards));
            })
            break;
        case '/product':
            fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, buffer) => {
                //const queryObj = qs.parse(urlObj.query);
                const objs = JSON.parse(buffer);
                if (err) {
                    res.writeHead(500, {
                        'content-type': 'application/json',
                    });
                    res.end({error: err.message});
                }

                const tempProduct = fs.readFileSync(`${__dirname}/product.html`, 'utf-8');

                res.end(replaceTemplate(tempProduct, objs[query.id]));
            });

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

                const result = (queryObj.id === undefined) ? objs : objs.filter((obj) => obj.id == queryObj.id);

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
