const EventEmitter = require("events");
const http = require('http');

class MyEmitter extends EventEmitter {
    constructor() {
        super();
    }

    hello(str) {
        console.log(`hello ${str}`);
    }
}

const myEmitter = new MyEmitter();
myEmitter.on("my_event", () => {
    myEmitter.hello('world');
});


http.createServer((req, res) => {
    console.log(req.httpVersion, req.method, req.url);
    myEmitter.emit("my_event");

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello World!',
    }));
}).listen(3333);
