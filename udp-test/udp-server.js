const dgram = require("dgram");
const { UDP_SOCKET_PORT, UPD_STOCK_HOST } = require('./constants');

const socket = dgram.createSocket("udp4");

socket.bind(UDP_SOCKET_PORT, UPD_STOCK_HOST, () => {
    console.log("udp stocket server");
})

const clintPorts = [];
socket.on('message',  (msg, rinfo) => {
    console.log(msg.toString('utf8'), rinfo);

    if (clintPorts.indexOf(rinfo.port) === -1) {
        clintPorts.push(rinfo.port);
    }
    
    clintPorts.map((port) => {
        if (port === rinfo.port) {
            return;
        }
        socket.send(msg, port, rinfo.address, (err, bytes) => {
            if (err) {
                console.log(err);
                return ;
            }
    
            console.log(bytes);
        });
    });
})