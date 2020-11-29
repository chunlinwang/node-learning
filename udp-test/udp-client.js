const drgam = require('dgram');
const readline = require('readline');

const { UDP_SOCKET_PORT, UPD_STOCK_HOST } = require('./constants');

const socket = drgam.createSocket('udp4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('port client ?', (port) => {
    socket.bind(port, UPD_STOCK_HOST);
    readline.clearLine(process.stdout)
});

const socketMsgSender = (message) => {
    socket.send(message, 0, message.length, UDP_SOCKET_PORT, UPD_STOCK_HOST, (err, bytes) => {
        if (err) {
            console.log(err);
            return;
        }
    
        console.log('client send: '+ bytes + ' message');
    });
}

rl.on('line', (input) => {
    console.log(`Received: ${input}`);

    socketMsgSender(input);
});

socket.on('message', (msg, rinfo) => {
    console.log(msg.toString('utf8'), rinfo);
});
