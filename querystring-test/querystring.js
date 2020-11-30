const qs = require('querystring');

const params = {
    page: 1,
    limit: 12,
    order: 'asc',
}
const encode = qs.encode(params);
console.log(encode);

const str = qs.stringify(params);
console.log(str);

console.log(qs.decode(str));
console.log(qs.parse(str));

console.log("\u{1F170}");