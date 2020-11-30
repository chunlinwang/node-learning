const fs = require('fs');

const file_buffer = fs.readFileSync('test.txt', {encoding: 'utf8', flag: 'a+'});

console.log(file_buffer.toString('utf8'));

const date = new Date();

const output = `${file_buffer}\nCreated on ${date.toString()}`


const file_output = fs.writeFileSync('test-out.txt', output, {encoding: 'utf8'});

fs.stat('test-out.txt', (err, state) => {
    if (err) console.log(err);

    console.log(state);
});