const fs = require('fs');

console.time('t0');
console.time('t1');
console.time('t2');
console.time('t-s');

const file_buffer = fs.readFileSync('test.txt', {encoding: 'utf8', flag: 'a+'});

console.log(file_buffer.toString('utf8'));
console.timeEnd('t-s');


fs.readFile('test.txt', (err, data) => {
    if (err) return;

    console.log('T1: '+data.toString());
    console.timeEnd('t1');
});

fs.readFile('test-out.txt', (err, data) => {
    if (err) return;

    console.log('T2: '+data.toString());
    console.timeEnd('t2');
});

console.log('load files: ');

console.timeEnd('t0');
