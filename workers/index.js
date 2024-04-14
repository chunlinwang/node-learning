const { fork } = require("child_process");
var { cpus } = require('os')

for(var i = 0; i < cpus.length; i++ ) {
    fork('./worker.js');
}